package com.therobotcarlson.distilled.web.rest;

import com.therobotcarlson.distilled.DistilledApp;

import com.therobotcarlson.distilled.domain.MashbillYeast;
import com.therobotcarlson.distilled.repository.MashbillYeastRepository;
import com.therobotcarlson.distilled.repository.search.MashbillYeastSearchRepository;
import com.therobotcarlson.distilled.service.MashbillYeastService;
import com.therobotcarlson.distilled.service.dto.MashbillYeastDTO;
import com.therobotcarlson.distilled.service.mapper.MashbillYeastMapper;
import com.therobotcarlson.distilled.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;


import static com.therobotcarlson.distilled.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the MashbillYeastResource REST controller.
 *
 * @see MashbillYeastResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DistilledApp.class)
public class MashbillYeastResourceIntTest {

    private static final Double DEFAULT_QUANTITY = 0D;
    private static final Double UPDATED_QUANTITY = 1D;

    @Autowired
    private MashbillYeastRepository mashbillYeastRepository;

    @Autowired
    private MashbillYeastMapper mashbillYeastMapper;

    @Autowired
    private MashbillYeastService mashbillYeastService;

    /**
     * This repository is mocked in the com.therobotcarlson.distilled.repository.search test package.
     *
     * @see com.therobotcarlson.distilled.repository.search.MashbillYeastSearchRepositoryMockConfiguration
     */
    @Autowired
    private MashbillYeastSearchRepository mockMashbillYeastSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restMashbillYeastMockMvc;

    private MashbillYeast mashbillYeast;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MashbillYeastResource mashbillYeastResource = new MashbillYeastResource(mashbillYeastService);
        this.restMashbillYeastMockMvc = MockMvcBuilders.standaloneSetup(mashbillYeastResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MashbillYeast createEntity(EntityManager em) {
        MashbillYeast mashbillYeast = new MashbillYeast()
            .quantity(DEFAULT_QUANTITY);
        return mashbillYeast;
    }

    @Before
    public void initTest() {
        mashbillYeast = createEntity(em);
    }

    @Test
    @Transactional
    public void createMashbillYeast() throws Exception {
        int databaseSizeBeforeCreate = mashbillYeastRepository.findAll().size();

        // Create the MashbillYeast
        MashbillYeastDTO mashbillYeastDTO = mashbillYeastMapper.toDto(mashbillYeast);
        restMashbillYeastMockMvc.perform(post("/api/mashbill-yeasts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mashbillYeastDTO)))
            .andExpect(status().isCreated());

        // Validate the MashbillYeast in the database
        List<MashbillYeast> mashbillYeastList = mashbillYeastRepository.findAll();
        assertThat(mashbillYeastList).hasSize(databaseSizeBeforeCreate + 1);
        MashbillYeast testMashbillYeast = mashbillYeastList.get(mashbillYeastList.size() - 1);
        assertThat(testMashbillYeast.getQuantity()).isEqualTo(DEFAULT_QUANTITY);

        // Validate the MashbillYeast in Elasticsearch
        verify(mockMashbillYeastSearchRepository, times(1)).save(testMashbillYeast);
    }

    @Test
    @Transactional
    public void createMashbillYeastWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mashbillYeastRepository.findAll().size();

        // Create the MashbillYeast with an existing ID
        mashbillYeast.setId(1L);
        MashbillYeastDTO mashbillYeastDTO = mashbillYeastMapper.toDto(mashbillYeast);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMashbillYeastMockMvc.perform(post("/api/mashbill-yeasts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mashbillYeastDTO)))
            .andExpect(status().isBadRequest());

        // Validate the MashbillYeast in the database
        List<MashbillYeast> mashbillYeastList = mashbillYeastRepository.findAll();
        assertThat(mashbillYeastList).hasSize(databaseSizeBeforeCreate);

        // Validate the MashbillYeast in Elasticsearch
        verify(mockMashbillYeastSearchRepository, times(0)).save(mashbillYeast);
    }

    @Test
    @Transactional
    public void getAllMashbillYeasts() throws Exception {
        // Initialize the database
        mashbillYeastRepository.saveAndFlush(mashbillYeast);

        // Get all the mashbillYeastList
        restMashbillYeastMockMvc.perform(get("/api/mashbill-yeasts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mashbillYeast.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getMashbillYeast() throws Exception {
        // Initialize the database
        mashbillYeastRepository.saveAndFlush(mashbillYeast);

        // Get the mashbillYeast
        restMashbillYeastMockMvc.perform(get("/api/mashbill-yeasts/{id}", mashbillYeast.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mashbillYeast.getId().intValue()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingMashbillYeast() throws Exception {
        // Get the mashbillYeast
        restMashbillYeastMockMvc.perform(get("/api/mashbill-yeasts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMashbillYeast() throws Exception {
        // Initialize the database
        mashbillYeastRepository.saveAndFlush(mashbillYeast);

        int databaseSizeBeforeUpdate = mashbillYeastRepository.findAll().size();

        // Update the mashbillYeast
        MashbillYeast updatedMashbillYeast = mashbillYeastRepository.findById(mashbillYeast.getId()).get();
        // Disconnect from session so that the updates on updatedMashbillYeast are not directly saved in db
        em.detach(updatedMashbillYeast);
        updatedMashbillYeast
            .quantity(UPDATED_QUANTITY);
        MashbillYeastDTO mashbillYeastDTO = mashbillYeastMapper.toDto(updatedMashbillYeast);

        restMashbillYeastMockMvc.perform(put("/api/mashbill-yeasts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mashbillYeastDTO)))
            .andExpect(status().isOk());

        // Validate the MashbillYeast in the database
        List<MashbillYeast> mashbillYeastList = mashbillYeastRepository.findAll();
        assertThat(mashbillYeastList).hasSize(databaseSizeBeforeUpdate);
        MashbillYeast testMashbillYeast = mashbillYeastList.get(mashbillYeastList.size() - 1);
        assertThat(testMashbillYeast.getQuantity()).isEqualTo(UPDATED_QUANTITY);

        // Validate the MashbillYeast in Elasticsearch
        verify(mockMashbillYeastSearchRepository, times(1)).save(testMashbillYeast);
    }

    @Test
    @Transactional
    public void updateNonExistingMashbillYeast() throws Exception {
        int databaseSizeBeforeUpdate = mashbillYeastRepository.findAll().size();

        // Create the MashbillYeast
        MashbillYeastDTO mashbillYeastDTO = mashbillYeastMapper.toDto(mashbillYeast);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMashbillYeastMockMvc.perform(put("/api/mashbill-yeasts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mashbillYeastDTO)))
            .andExpect(status().isBadRequest());

        // Validate the MashbillYeast in the database
        List<MashbillYeast> mashbillYeastList = mashbillYeastRepository.findAll();
        assertThat(mashbillYeastList).hasSize(databaseSizeBeforeUpdate);

        // Validate the MashbillYeast in Elasticsearch
        verify(mockMashbillYeastSearchRepository, times(0)).save(mashbillYeast);
    }

    @Test
    @Transactional
    public void deleteMashbillYeast() throws Exception {
        // Initialize the database
        mashbillYeastRepository.saveAndFlush(mashbillYeast);

        int databaseSizeBeforeDelete = mashbillYeastRepository.findAll().size();

        // Delete the mashbillYeast
        restMashbillYeastMockMvc.perform(delete("/api/mashbill-yeasts/{id}", mashbillYeast.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MashbillYeast> mashbillYeastList = mashbillYeastRepository.findAll();
        assertThat(mashbillYeastList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the MashbillYeast in Elasticsearch
        verify(mockMashbillYeastSearchRepository, times(1)).deleteById(mashbillYeast.getId());
    }

    @Test
    @Transactional
    public void searchMashbillYeast() throws Exception {
        // Initialize the database
        mashbillYeastRepository.saveAndFlush(mashbillYeast);
        when(mockMashbillYeastSearchRepository.search(queryStringQuery("id:" + mashbillYeast.getId())))
            .thenReturn(Collections.singletonList(mashbillYeast));
        // Search the mashbillYeast
        restMashbillYeastMockMvc.perform(get("/api/_search/mashbill-yeasts?query=id:" + mashbillYeast.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mashbillYeast.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY.doubleValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MashbillYeast.class);
        MashbillYeast mashbillYeast1 = new MashbillYeast();
        mashbillYeast1.setId(1L);
        MashbillYeast mashbillYeast2 = new MashbillYeast();
        mashbillYeast2.setId(mashbillYeast1.getId());
        assertThat(mashbillYeast1).isEqualTo(mashbillYeast2);
        mashbillYeast2.setId(2L);
        assertThat(mashbillYeast1).isNotEqualTo(mashbillYeast2);
        mashbillYeast1.setId(null);
        assertThat(mashbillYeast1).isNotEqualTo(mashbillYeast2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(MashbillYeastDTO.class);
        MashbillYeastDTO mashbillYeastDTO1 = new MashbillYeastDTO();
        mashbillYeastDTO1.setId(1L);
        MashbillYeastDTO mashbillYeastDTO2 = new MashbillYeastDTO();
        assertThat(mashbillYeastDTO1).isNotEqualTo(mashbillYeastDTO2);
        mashbillYeastDTO2.setId(mashbillYeastDTO1.getId());
        assertThat(mashbillYeastDTO1).isEqualTo(mashbillYeastDTO2);
        mashbillYeastDTO2.setId(2L);
        assertThat(mashbillYeastDTO1).isNotEqualTo(mashbillYeastDTO2);
        mashbillYeastDTO1.setId(null);
        assertThat(mashbillYeastDTO1).isNotEqualTo(mashbillYeastDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(mashbillYeastMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(mashbillYeastMapper.fromId(null)).isNull();
    }
}

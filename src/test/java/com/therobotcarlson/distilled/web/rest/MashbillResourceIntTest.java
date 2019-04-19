package com.therobotcarlson.distilled.web.rest;

import com.therobotcarlson.distilled.DistilledApp;

import com.therobotcarlson.distilled.domain.Mashbill;
import com.therobotcarlson.distilled.repository.MashbillRepository;
import com.therobotcarlson.distilled.repository.search.MashbillSearchRepository;
import com.therobotcarlson.distilled.service.MashbillService;
import com.therobotcarlson.distilled.service.dto.MashbillDTO;
import com.therobotcarlson.distilled.service.mapper.MashbillMapper;
import com.therobotcarlson.distilled.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.ArrayList;
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
 * Test class for the MashbillResource REST controller.
 *
 * @see MashbillResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DistilledApp.class)
public class MashbillResourceIntTest {

    private static final String DEFAULT_MASHBILL_NAME = "AAAAAAAAAA";
    private static final String UPDATED_MASHBILL_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_MASHBILL_CODE = "AAAAAAAAAA";
    private static final String UPDATED_MASHBILL_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_MASHBILL_NOTES = "AAAAAAAAAA";
    private static final String UPDATED_MASHBILL_NOTES = "BBBBBBBBBB";

    @Autowired
    private MashbillRepository mashbillRepository;

    @Mock
    private MashbillRepository mashbillRepositoryMock;

    @Autowired
    private MashbillMapper mashbillMapper;

    @Mock
    private MashbillService mashbillServiceMock;

    @Autowired
    private MashbillService mashbillService;

    /**
     * This repository is mocked in the com.therobotcarlson.distilled.repository.search test package.
     *
     * @see com.therobotcarlson.distilled.repository.search.MashbillSearchRepositoryMockConfiguration
     */
    @Autowired
    private MashbillSearchRepository mockMashbillSearchRepository;

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

    private MockMvc restMashbillMockMvc;

    private Mashbill mashbill;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MashbillResource mashbillResource = new MashbillResource(mashbillService);
        this.restMashbillMockMvc = MockMvcBuilders.standaloneSetup(mashbillResource)
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
    public static Mashbill createEntity(EntityManager em) {
        Mashbill mashbill = new Mashbill()
            .mashbillName(DEFAULT_MASHBILL_NAME)
            .mashbillCode(DEFAULT_MASHBILL_CODE)
            .mashbillNotes(DEFAULT_MASHBILL_NOTES);
        return mashbill;
    }

    @Before
    public void initTest() {
        mashbill = createEntity(em);
    }

    @Test
    @Transactional
    public void createMashbill() throws Exception {
        int databaseSizeBeforeCreate = mashbillRepository.findAll().size();

        // Create the Mashbill
        MashbillDTO mashbillDTO = mashbillMapper.toDto(mashbill);
        restMashbillMockMvc.perform(post("/api/mashbills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mashbillDTO)))
            .andExpect(status().isCreated());

        // Validate the Mashbill in the database
        List<Mashbill> mashbillList = mashbillRepository.findAll();
        assertThat(mashbillList).hasSize(databaseSizeBeforeCreate + 1);
        Mashbill testMashbill = mashbillList.get(mashbillList.size() - 1);
        assertThat(testMashbill.getMashbillName()).isEqualTo(DEFAULT_MASHBILL_NAME);
        assertThat(testMashbill.getMashbillCode()).isEqualTo(DEFAULT_MASHBILL_CODE);
        assertThat(testMashbill.getMashbillNotes()).isEqualTo(DEFAULT_MASHBILL_NOTES);

        // Validate the Mashbill in Elasticsearch
        verify(mockMashbillSearchRepository, times(1)).save(testMashbill);
    }

    @Test
    @Transactional
    public void createMashbillWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mashbillRepository.findAll().size();

        // Create the Mashbill with an existing ID
        mashbill.setId(1L);
        MashbillDTO mashbillDTO = mashbillMapper.toDto(mashbill);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMashbillMockMvc.perform(post("/api/mashbills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mashbillDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Mashbill in the database
        List<Mashbill> mashbillList = mashbillRepository.findAll();
        assertThat(mashbillList).hasSize(databaseSizeBeforeCreate);

        // Validate the Mashbill in Elasticsearch
        verify(mockMashbillSearchRepository, times(0)).save(mashbill);
    }

    @Test
    @Transactional
    public void checkMashbillNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = mashbillRepository.findAll().size();
        // set the field null
        mashbill.setMashbillName(null);

        // Create the Mashbill, which fails.
        MashbillDTO mashbillDTO = mashbillMapper.toDto(mashbill);

        restMashbillMockMvc.perform(post("/api/mashbills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mashbillDTO)))
            .andExpect(status().isBadRequest());

        List<Mashbill> mashbillList = mashbillRepository.findAll();
        assertThat(mashbillList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMashbillCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = mashbillRepository.findAll().size();
        // set the field null
        mashbill.setMashbillCode(null);

        // Create the Mashbill, which fails.
        MashbillDTO mashbillDTO = mashbillMapper.toDto(mashbill);

        restMashbillMockMvc.perform(post("/api/mashbills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mashbillDTO)))
            .andExpect(status().isBadRequest());

        List<Mashbill> mashbillList = mashbillRepository.findAll();
        assertThat(mashbillList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMashbills() throws Exception {
        // Initialize the database
        mashbillRepository.saveAndFlush(mashbill);

        // Get all the mashbillList
        restMashbillMockMvc.perform(get("/api/mashbills?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mashbill.getId().intValue())))
            .andExpect(jsonPath("$.[*].mashbillName").value(hasItem(DEFAULT_MASHBILL_NAME.toString())))
            .andExpect(jsonPath("$.[*].mashbillCode").value(hasItem(DEFAULT_MASHBILL_CODE.toString())))
            .andExpect(jsonPath("$.[*].mashbillNotes").value(hasItem(DEFAULT_MASHBILL_NOTES.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllMashbillsWithEagerRelationshipsIsEnabled() throws Exception {
        MashbillResource mashbillResource = new MashbillResource(mashbillServiceMock);
        when(mashbillServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restMashbillMockMvc = MockMvcBuilders.standaloneSetup(mashbillResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restMashbillMockMvc.perform(get("/api/mashbills?eagerload=true"))
        .andExpect(status().isOk());

        verify(mashbillServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllMashbillsWithEagerRelationshipsIsNotEnabled() throws Exception {
        MashbillResource mashbillResource = new MashbillResource(mashbillServiceMock);
            when(mashbillServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restMashbillMockMvc = MockMvcBuilders.standaloneSetup(mashbillResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restMashbillMockMvc.perform(get("/api/mashbills?eagerload=true"))
        .andExpect(status().isOk());

            verify(mashbillServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getMashbill() throws Exception {
        // Initialize the database
        mashbillRepository.saveAndFlush(mashbill);

        // Get the mashbill
        restMashbillMockMvc.perform(get("/api/mashbills/{id}", mashbill.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mashbill.getId().intValue()))
            .andExpect(jsonPath("$.mashbillName").value(DEFAULT_MASHBILL_NAME.toString()))
            .andExpect(jsonPath("$.mashbillCode").value(DEFAULT_MASHBILL_CODE.toString()))
            .andExpect(jsonPath("$.mashbillNotes").value(DEFAULT_MASHBILL_NOTES.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMashbill() throws Exception {
        // Get the mashbill
        restMashbillMockMvc.perform(get("/api/mashbills/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMashbill() throws Exception {
        // Initialize the database
        mashbillRepository.saveAndFlush(mashbill);

        int databaseSizeBeforeUpdate = mashbillRepository.findAll().size();

        // Update the mashbill
        Mashbill updatedMashbill = mashbillRepository.findById(mashbill.getId()).get();
        // Disconnect from session so that the updates on updatedMashbill are not directly saved in db
        em.detach(updatedMashbill);
        updatedMashbill
            .mashbillName(UPDATED_MASHBILL_NAME)
            .mashbillCode(UPDATED_MASHBILL_CODE)
            .mashbillNotes(UPDATED_MASHBILL_NOTES);
        MashbillDTO mashbillDTO = mashbillMapper.toDto(updatedMashbill);

        restMashbillMockMvc.perform(put("/api/mashbills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mashbillDTO)))
            .andExpect(status().isOk());

        // Validate the Mashbill in the database
        List<Mashbill> mashbillList = mashbillRepository.findAll();
        assertThat(mashbillList).hasSize(databaseSizeBeforeUpdate);
        Mashbill testMashbill = mashbillList.get(mashbillList.size() - 1);
        assertThat(testMashbill.getMashbillName()).isEqualTo(UPDATED_MASHBILL_NAME);
        assertThat(testMashbill.getMashbillCode()).isEqualTo(UPDATED_MASHBILL_CODE);
        assertThat(testMashbill.getMashbillNotes()).isEqualTo(UPDATED_MASHBILL_NOTES);

        // Validate the Mashbill in Elasticsearch
        verify(mockMashbillSearchRepository, times(1)).save(testMashbill);
    }

    @Test
    @Transactional
    public void updateNonExistingMashbill() throws Exception {
        int databaseSizeBeforeUpdate = mashbillRepository.findAll().size();

        // Create the Mashbill
        MashbillDTO mashbillDTO = mashbillMapper.toDto(mashbill);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMashbillMockMvc.perform(put("/api/mashbills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mashbillDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Mashbill in the database
        List<Mashbill> mashbillList = mashbillRepository.findAll();
        assertThat(mashbillList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Mashbill in Elasticsearch
        verify(mockMashbillSearchRepository, times(0)).save(mashbill);
    }

    @Test
    @Transactional
    public void deleteMashbill() throws Exception {
        // Initialize the database
        mashbillRepository.saveAndFlush(mashbill);

        int databaseSizeBeforeDelete = mashbillRepository.findAll().size();

        // Delete the mashbill
        restMashbillMockMvc.perform(delete("/api/mashbills/{id}", mashbill.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Mashbill> mashbillList = mashbillRepository.findAll();
        assertThat(mashbillList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Mashbill in Elasticsearch
        verify(mockMashbillSearchRepository, times(1)).deleteById(mashbill.getId());
    }

    @Test
    @Transactional
    public void searchMashbill() throws Exception {
        // Initialize the database
        mashbillRepository.saveAndFlush(mashbill);
        when(mockMashbillSearchRepository.search(queryStringQuery("id:" + mashbill.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(mashbill), PageRequest.of(0, 1), 1));
        // Search the mashbill
        restMashbillMockMvc.perform(get("/api/_search/mashbills?query=id:" + mashbill.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mashbill.getId().intValue())))
            .andExpect(jsonPath("$.[*].mashbillName").value(hasItem(DEFAULT_MASHBILL_NAME)))
            .andExpect(jsonPath("$.[*].mashbillCode").value(hasItem(DEFAULT_MASHBILL_CODE)))
            .andExpect(jsonPath("$.[*].mashbillNotes").value(hasItem(DEFAULT_MASHBILL_NOTES)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Mashbill.class);
        Mashbill mashbill1 = new Mashbill();
        mashbill1.setId(1L);
        Mashbill mashbill2 = new Mashbill();
        mashbill2.setId(mashbill1.getId());
        assertThat(mashbill1).isEqualTo(mashbill2);
        mashbill2.setId(2L);
        assertThat(mashbill1).isNotEqualTo(mashbill2);
        mashbill1.setId(null);
        assertThat(mashbill1).isNotEqualTo(mashbill2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(MashbillDTO.class);
        MashbillDTO mashbillDTO1 = new MashbillDTO();
        mashbillDTO1.setId(1L);
        MashbillDTO mashbillDTO2 = new MashbillDTO();
        assertThat(mashbillDTO1).isNotEqualTo(mashbillDTO2);
        mashbillDTO2.setId(mashbillDTO1.getId());
        assertThat(mashbillDTO1).isEqualTo(mashbillDTO2);
        mashbillDTO2.setId(2L);
        assertThat(mashbillDTO1).isNotEqualTo(mashbillDTO2);
        mashbillDTO1.setId(null);
        assertThat(mashbillDTO1).isNotEqualTo(mashbillDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(mashbillMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(mashbillMapper.fromId(null)).isNull();
    }
}

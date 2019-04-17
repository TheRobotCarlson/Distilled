package com.therobotcarlson.distilled.web.rest;

import com.therobotcarlson.distilled.DistilledApp;

import com.therobotcarlson.distilled.domain.Yeast;
import com.therobotcarlson.distilled.repository.YeastRepository;
import com.therobotcarlson.distilled.repository.search.YeastSearchRepository;
import com.therobotcarlson.distilled.service.YeastService;
import com.therobotcarlson.distilled.service.dto.YeastDTO;
import com.therobotcarlson.distilled.service.mapper.YeastMapper;
import com.therobotcarlson.distilled.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
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
 * Test class for the YeastResource REST controller.
 *
 * @see YeastResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DistilledApp.class)
public class YeastResourceIntTest {

    private static final String DEFAULT_YEAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_YEAST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_YEAST_CODE = "AAAAAAAAAA";
    private static final String UPDATED_YEAST_CODE = "BBBBBBBBBB";

    private static final Integer DEFAULT_YEAST_PALLET_NUM = 1;
    private static final Integer UPDATED_YEAST_PALLET_NUM = 2;

    @Autowired
    private YeastRepository yeastRepository;

    @Autowired
    private YeastMapper yeastMapper;

    @Autowired
    private YeastService yeastService;

    /**
     * This repository is mocked in the com.therobotcarlson.distilled.repository.search test package.
     *
     * @see com.therobotcarlson.distilled.repository.search.YeastSearchRepositoryMockConfiguration
     */
    @Autowired
    private YeastSearchRepository mockYeastSearchRepository;

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

    private MockMvc restYeastMockMvc;

    private Yeast yeast;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final YeastResource yeastResource = new YeastResource(yeastService);
        this.restYeastMockMvc = MockMvcBuilders.standaloneSetup(yeastResource)
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
    public static Yeast createEntity(EntityManager em) {
        Yeast yeast = new Yeast()
            .yeastName(DEFAULT_YEAST_NAME)
            .yeastCode(DEFAULT_YEAST_CODE)
            .yeastPalletNum(DEFAULT_YEAST_PALLET_NUM);
        return yeast;
    }

    @Before
    public void initTest() {
        yeast = createEntity(em);
    }

    @Test
    @Transactional
    public void createYeast() throws Exception {
        int databaseSizeBeforeCreate = yeastRepository.findAll().size();

        // Create the Yeast
        YeastDTO yeastDTO = yeastMapper.toDto(yeast);
        restYeastMockMvc.perform(post("/api/yeasts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(yeastDTO)))
            .andExpect(status().isCreated());

        // Validate the Yeast in the database
        List<Yeast> yeastList = yeastRepository.findAll();
        assertThat(yeastList).hasSize(databaseSizeBeforeCreate + 1);
        Yeast testYeast = yeastList.get(yeastList.size() - 1);
        assertThat(testYeast.getYeastName()).isEqualTo(DEFAULT_YEAST_NAME);
        assertThat(testYeast.getYeastCode()).isEqualTo(DEFAULT_YEAST_CODE);
        assertThat(testYeast.getYeastPalletNum()).isEqualTo(DEFAULT_YEAST_PALLET_NUM);

        // Validate the Yeast in Elasticsearch
        verify(mockYeastSearchRepository, times(1)).save(testYeast);
    }

    @Test
    @Transactional
    public void createYeastWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = yeastRepository.findAll().size();

        // Create the Yeast with an existing ID
        yeast.setId(1L);
        YeastDTO yeastDTO = yeastMapper.toDto(yeast);

        // An entity with an existing ID cannot be created, so this API call must fail
        restYeastMockMvc.perform(post("/api/yeasts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(yeastDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Yeast in the database
        List<Yeast> yeastList = yeastRepository.findAll();
        assertThat(yeastList).hasSize(databaseSizeBeforeCreate);

        // Validate the Yeast in Elasticsearch
        verify(mockYeastSearchRepository, times(0)).save(yeast);
    }

    @Test
    @Transactional
    public void checkYeastNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = yeastRepository.findAll().size();
        // set the field null
        yeast.setYeastName(null);

        // Create the Yeast, which fails.
        YeastDTO yeastDTO = yeastMapper.toDto(yeast);

        restYeastMockMvc.perform(post("/api/yeasts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(yeastDTO)))
            .andExpect(status().isBadRequest());

        List<Yeast> yeastList = yeastRepository.findAll();
        assertThat(yeastList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkYeastCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = yeastRepository.findAll().size();
        // set the field null
        yeast.setYeastCode(null);

        // Create the Yeast, which fails.
        YeastDTO yeastDTO = yeastMapper.toDto(yeast);

        restYeastMockMvc.perform(post("/api/yeasts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(yeastDTO)))
            .andExpect(status().isBadRequest());

        List<Yeast> yeastList = yeastRepository.findAll();
        assertThat(yeastList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkYeastPalletNumIsRequired() throws Exception {
        int databaseSizeBeforeTest = yeastRepository.findAll().size();
        // set the field null
        yeast.setYeastPalletNum(null);

        // Create the Yeast, which fails.
        YeastDTO yeastDTO = yeastMapper.toDto(yeast);

        restYeastMockMvc.perform(post("/api/yeasts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(yeastDTO)))
            .andExpect(status().isBadRequest());

        List<Yeast> yeastList = yeastRepository.findAll();
        assertThat(yeastList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllYeasts() throws Exception {
        // Initialize the database
        yeastRepository.saveAndFlush(yeast);

        // Get all the yeastList
        restYeastMockMvc.perform(get("/api/yeasts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(yeast.getId().intValue())))
            .andExpect(jsonPath("$.[*].yeastName").value(hasItem(DEFAULT_YEAST_NAME.toString())))
            .andExpect(jsonPath("$.[*].yeastCode").value(hasItem(DEFAULT_YEAST_CODE.toString())))
            .andExpect(jsonPath("$.[*].yeastPalletNum").value(hasItem(DEFAULT_YEAST_PALLET_NUM)));
    }
    
    @Test
    @Transactional
    public void getYeast() throws Exception {
        // Initialize the database
        yeastRepository.saveAndFlush(yeast);

        // Get the yeast
        restYeastMockMvc.perform(get("/api/yeasts/{id}", yeast.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(yeast.getId().intValue()))
            .andExpect(jsonPath("$.yeastName").value(DEFAULT_YEAST_NAME.toString()))
            .andExpect(jsonPath("$.yeastCode").value(DEFAULT_YEAST_CODE.toString()))
            .andExpect(jsonPath("$.yeastPalletNum").value(DEFAULT_YEAST_PALLET_NUM));
    }

    @Test
    @Transactional
    public void getNonExistingYeast() throws Exception {
        // Get the yeast
        restYeastMockMvc.perform(get("/api/yeasts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateYeast() throws Exception {
        // Initialize the database
        yeastRepository.saveAndFlush(yeast);

        int databaseSizeBeforeUpdate = yeastRepository.findAll().size();

        // Update the yeast
        Yeast updatedYeast = yeastRepository.findById(yeast.getId()).get();
        // Disconnect from session so that the updates on updatedYeast are not directly saved in db
        em.detach(updatedYeast);
        updatedYeast
            .yeastName(UPDATED_YEAST_NAME)
            .yeastCode(UPDATED_YEAST_CODE)
            .yeastPalletNum(UPDATED_YEAST_PALLET_NUM);
        YeastDTO yeastDTO = yeastMapper.toDto(updatedYeast);

        restYeastMockMvc.perform(put("/api/yeasts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(yeastDTO)))
            .andExpect(status().isOk());

        // Validate the Yeast in the database
        List<Yeast> yeastList = yeastRepository.findAll();
        assertThat(yeastList).hasSize(databaseSizeBeforeUpdate);
        Yeast testYeast = yeastList.get(yeastList.size() - 1);
        assertThat(testYeast.getYeastName()).isEqualTo(UPDATED_YEAST_NAME);
        assertThat(testYeast.getYeastCode()).isEqualTo(UPDATED_YEAST_CODE);
        assertThat(testYeast.getYeastPalletNum()).isEqualTo(UPDATED_YEAST_PALLET_NUM);

        // Validate the Yeast in Elasticsearch
        verify(mockYeastSearchRepository, times(1)).save(testYeast);
    }

    @Test
    @Transactional
    public void updateNonExistingYeast() throws Exception {
        int databaseSizeBeforeUpdate = yeastRepository.findAll().size();

        // Create the Yeast
        YeastDTO yeastDTO = yeastMapper.toDto(yeast);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restYeastMockMvc.perform(put("/api/yeasts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(yeastDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Yeast in the database
        List<Yeast> yeastList = yeastRepository.findAll();
        assertThat(yeastList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Yeast in Elasticsearch
        verify(mockYeastSearchRepository, times(0)).save(yeast);
    }

    @Test
    @Transactional
    public void deleteYeast() throws Exception {
        // Initialize the database
        yeastRepository.saveAndFlush(yeast);

        int databaseSizeBeforeDelete = yeastRepository.findAll().size();

        // Delete the yeast
        restYeastMockMvc.perform(delete("/api/yeasts/{id}", yeast.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Yeast> yeastList = yeastRepository.findAll();
        assertThat(yeastList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Yeast in Elasticsearch
        verify(mockYeastSearchRepository, times(1)).deleteById(yeast.getId());
    }

    @Test
    @Transactional
    public void searchYeast() throws Exception {
        // Initialize the database
        yeastRepository.saveAndFlush(yeast);
        when(mockYeastSearchRepository.search(queryStringQuery("id:" + yeast.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(yeast), PageRequest.of(0, 1), 1));
        // Search the yeast
        restYeastMockMvc.perform(get("/api/_search/yeasts?query=id:" + yeast.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(yeast.getId().intValue())))
            .andExpect(jsonPath("$.[*].yeastName").value(hasItem(DEFAULT_YEAST_NAME)))
            .andExpect(jsonPath("$.[*].yeastCode").value(hasItem(DEFAULT_YEAST_CODE)))
            .andExpect(jsonPath("$.[*].yeastPalletNum").value(hasItem(DEFAULT_YEAST_PALLET_NUM)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Yeast.class);
        Yeast yeast1 = new Yeast();
        yeast1.setId(1L);
        Yeast yeast2 = new Yeast();
        yeast2.setId(yeast1.getId());
        assertThat(yeast1).isEqualTo(yeast2);
        yeast2.setId(2L);
        assertThat(yeast1).isNotEqualTo(yeast2);
        yeast1.setId(null);
        assertThat(yeast1).isNotEqualTo(yeast2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(YeastDTO.class);
        YeastDTO yeastDTO1 = new YeastDTO();
        yeastDTO1.setId(1L);
        YeastDTO yeastDTO2 = new YeastDTO();
        assertThat(yeastDTO1).isNotEqualTo(yeastDTO2);
        yeastDTO2.setId(yeastDTO1.getId());
        assertThat(yeastDTO1).isEqualTo(yeastDTO2);
        yeastDTO2.setId(2L);
        assertThat(yeastDTO1).isNotEqualTo(yeastDTO2);
        yeastDTO1.setId(null);
        assertThat(yeastDTO1).isNotEqualTo(yeastDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(yeastMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(yeastMapper.fromId(null)).isNull();
    }
}

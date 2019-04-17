package com.therobotcarlson.distilled.web.rest;

import com.therobotcarlson.distilled.DistilledApp;

import com.therobotcarlson.distilled.domain.Grain;
import com.therobotcarlson.distilled.repository.GrainRepository;
import com.therobotcarlson.distilled.repository.search.GrainSearchRepository;
import com.therobotcarlson.distilled.service.GrainService;
import com.therobotcarlson.distilled.service.dto.GrainDTO;
import com.therobotcarlson.distilled.service.mapper.GrainMapper;
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
 * Test class for the GrainResource REST controller.
 *
 * @see GrainResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DistilledApp.class)
public class GrainResourceIntTest {

    private static final String DEFAULT_GRAIN_NAME = "AAAAAAAAAA";
    private static final String UPDATED_GRAIN_NAME = "BBBBBBBBBB";

    private static final Double DEFAULT_GRAIN_BUSHEL_WEIGHT = 0D;
    private static final Double UPDATED_GRAIN_BUSHEL_WEIGHT = 1D;

    @Autowired
    private GrainRepository grainRepository;

    @Autowired
    private GrainMapper grainMapper;

    @Autowired
    private GrainService grainService;

    /**
     * This repository is mocked in the com.therobotcarlson.distilled.repository.search test package.
     *
     * @see com.therobotcarlson.distilled.repository.search.GrainSearchRepositoryMockConfiguration
     */
    @Autowired
    private GrainSearchRepository mockGrainSearchRepository;

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

    private MockMvc restGrainMockMvc;

    private Grain grain;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GrainResource grainResource = new GrainResource(grainService);
        this.restGrainMockMvc = MockMvcBuilders.standaloneSetup(grainResource)
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
    public static Grain createEntity(EntityManager em) {
        Grain grain = new Grain()
            .grainName(DEFAULT_GRAIN_NAME)
            .grainBushelWeight(DEFAULT_GRAIN_BUSHEL_WEIGHT);
        return grain;
    }

    @Before
    public void initTest() {
        grain = createEntity(em);
    }

    @Test
    @Transactional
    public void createGrain() throws Exception {
        int databaseSizeBeforeCreate = grainRepository.findAll().size();

        // Create the Grain
        GrainDTO grainDTO = grainMapper.toDto(grain);
        restGrainMockMvc.perform(post("/api/grains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(grainDTO)))
            .andExpect(status().isCreated());

        // Validate the Grain in the database
        List<Grain> grainList = grainRepository.findAll();
        assertThat(grainList).hasSize(databaseSizeBeforeCreate + 1);
        Grain testGrain = grainList.get(grainList.size() - 1);
        assertThat(testGrain.getGrainName()).isEqualTo(DEFAULT_GRAIN_NAME);
        assertThat(testGrain.getGrainBushelWeight()).isEqualTo(DEFAULT_GRAIN_BUSHEL_WEIGHT);

        // Validate the Grain in Elasticsearch
        verify(mockGrainSearchRepository, times(1)).save(testGrain);
    }

    @Test
    @Transactional
    public void createGrainWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = grainRepository.findAll().size();

        // Create the Grain with an existing ID
        grain.setId(1L);
        GrainDTO grainDTO = grainMapper.toDto(grain);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGrainMockMvc.perform(post("/api/grains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(grainDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Grain in the database
        List<Grain> grainList = grainRepository.findAll();
        assertThat(grainList).hasSize(databaseSizeBeforeCreate);

        // Validate the Grain in Elasticsearch
        verify(mockGrainSearchRepository, times(0)).save(grain);
    }

    @Test
    @Transactional
    public void checkGrainNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = grainRepository.findAll().size();
        // set the field null
        grain.setGrainName(null);

        // Create the Grain, which fails.
        GrainDTO grainDTO = grainMapper.toDto(grain);

        restGrainMockMvc.perform(post("/api/grains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(grainDTO)))
            .andExpect(status().isBadRequest());

        List<Grain> grainList = grainRepository.findAll();
        assertThat(grainList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkGrainBushelWeightIsRequired() throws Exception {
        int databaseSizeBeforeTest = grainRepository.findAll().size();
        // set the field null
        grain.setGrainBushelWeight(null);

        // Create the Grain, which fails.
        GrainDTO grainDTO = grainMapper.toDto(grain);

        restGrainMockMvc.perform(post("/api/grains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(grainDTO)))
            .andExpect(status().isBadRequest());

        List<Grain> grainList = grainRepository.findAll();
        assertThat(grainList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllGrains() throws Exception {
        // Initialize the database
        grainRepository.saveAndFlush(grain);

        // Get all the grainList
        restGrainMockMvc.perform(get("/api/grains?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(grain.getId().intValue())))
            .andExpect(jsonPath("$.[*].grainName").value(hasItem(DEFAULT_GRAIN_NAME.toString())))
            .andExpect(jsonPath("$.[*].grainBushelWeight").value(hasItem(DEFAULT_GRAIN_BUSHEL_WEIGHT.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getGrain() throws Exception {
        // Initialize the database
        grainRepository.saveAndFlush(grain);

        // Get the grain
        restGrainMockMvc.perform(get("/api/grains/{id}", grain.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(grain.getId().intValue()))
            .andExpect(jsonPath("$.grainName").value(DEFAULT_GRAIN_NAME.toString()))
            .andExpect(jsonPath("$.grainBushelWeight").value(DEFAULT_GRAIN_BUSHEL_WEIGHT.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingGrain() throws Exception {
        // Get the grain
        restGrainMockMvc.perform(get("/api/grains/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGrain() throws Exception {
        // Initialize the database
        grainRepository.saveAndFlush(grain);

        int databaseSizeBeforeUpdate = grainRepository.findAll().size();

        // Update the grain
        Grain updatedGrain = grainRepository.findById(grain.getId()).get();
        // Disconnect from session so that the updates on updatedGrain are not directly saved in db
        em.detach(updatedGrain);
        updatedGrain
            .grainName(UPDATED_GRAIN_NAME)
            .grainBushelWeight(UPDATED_GRAIN_BUSHEL_WEIGHT);
        GrainDTO grainDTO = grainMapper.toDto(updatedGrain);

        restGrainMockMvc.perform(put("/api/grains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(grainDTO)))
            .andExpect(status().isOk());

        // Validate the Grain in the database
        List<Grain> grainList = grainRepository.findAll();
        assertThat(grainList).hasSize(databaseSizeBeforeUpdate);
        Grain testGrain = grainList.get(grainList.size() - 1);
        assertThat(testGrain.getGrainName()).isEqualTo(UPDATED_GRAIN_NAME);
        assertThat(testGrain.getGrainBushelWeight()).isEqualTo(UPDATED_GRAIN_BUSHEL_WEIGHT);

        // Validate the Grain in Elasticsearch
        verify(mockGrainSearchRepository, times(1)).save(testGrain);
    }

    @Test
    @Transactional
    public void updateNonExistingGrain() throws Exception {
        int databaseSizeBeforeUpdate = grainRepository.findAll().size();

        // Create the Grain
        GrainDTO grainDTO = grainMapper.toDto(grain);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGrainMockMvc.perform(put("/api/grains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(grainDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Grain in the database
        List<Grain> grainList = grainRepository.findAll();
        assertThat(grainList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Grain in Elasticsearch
        verify(mockGrainSearchRepository, times(0)).save(grain);
    }

    @Test
    @Transactional
    public void deleteGrain() throws Exception {
        // Initialize the database
        grainRepository.saveAndFlush(grain);

        int databaseSizeBeforeDelete = grainRepository.findAll().size();

        // Delete the grain
        restGrainMockMvc.perform(delete("/api/grains/{id}", grain.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Grain> grainList = grainRepository.findAll();
        assertThat(grainList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Grain in Elasticsearch
        verify(mockGrainSearchRepository, times(1)).deleteById(grain.getId());
    }

    @Test
    @Transactional
    public void searchGrain() throws Exception {
        // Initialize the database
        grainRepository.saveAndFlush(grain);
        when(mockGrainSearchRepository.search(queryStringQuery("id:" + grain.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(grain), PageRequest.of(0, 1), 1));
        // Search the grain
        restGrainMockMvc.perform(get("/api/_search/grains?query=id:" + grain.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(grain.getId().intValue())))
            .andExpect(jsonPath("$.[*].grainName").value(hasItem(DEFAULT_GRAIN_NAME)))
            .andExpect(jsonPath("$.[*].grainBushelWeight").value(hasItem(DEFAULT_GRAIN_BUSHEL_WEIGHT.doubleValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Grain.class);
        Grain grain1 = new Grain();
        grain1.setId(1L);
        Grain grain2 = new Grain();
        grain2.setId(grain1.getId());
        assertThat(grain1).isEqualTo(grain2);
        grain2.setId(2L);
        assertThat(grain1).isNotEqualTo(grain2);
        grain1.setId(null);
        assertThat(grain1).isNotEqualTo(grain2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GrainDTO.class);
        GrainDTO grainDTO1 = new GrainDTO();
        grainDTO1.setId(1L);
        GrainDTO grainDTO2 = new GrainDTO();
        assertThat(grainDTO1).isNotEqualTo(grainDTO2);
        grainDTO2.setId(grainDTO1.getId());
        assertThat(grainDTO1).isEqualTo(grainDTO2);
        grainDTO2.setId(2L);
        assertThat(grainDTO1).isNotEqualTo(grainDTO2);
        grainDTO1.setId(null);
        assertThat(grainDTO1).isNotEqualTo(grainDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(grainMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(grainMapper.fromId(null)).isNull();
    }
}

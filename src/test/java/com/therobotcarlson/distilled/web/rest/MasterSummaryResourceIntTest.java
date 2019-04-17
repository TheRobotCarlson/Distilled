package com.therobotcarlson.distilled.web.rest;

import com.therobotcarlson.distilled.DistilledApp;

import com.therobotcarlson.distilled.domain.MasterSummary;
import com.therobotcarlson.distilled.repository.MasterSummaryRepository;
import com.therobotcarlson.distilled.repository.search.MasterSummarySearchRepository;
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
 * Test class for the MasterSummaryResource REST controller.
 *
 * @see MasterSummaryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DistilledApp.class)
public class MasterSummaryResourceIntTest {

    private static final Integer DEFAULT_PROOF_GALLONS = 1;
    private static final Integer UPDATED_PROOF_GALLONS = 2;

    private static final Integer DEFAULT_ACTUAL_BARREL_COUNT = 1;
    private static final Integer UPDATED_ACTUAL_BARREL_COUNT = 2;

    @Autowired
    private MasterSummaryRepository masterSummaryRepository;

    /**
     * This repository is mocked in the com.therobotcarlson.distilled.repository.search test package.
     *
     * @see com.therobotcarlson.distilled.repository.search.MasterSummarySearchRepositoryMockConfiguration
     */
    @Autowired
    private MasterSummarySearchRepository mockMasterSummarySearchRepository;

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

    private MockMvc restMasterSummaryMockMvc;

    private MasterSummary masterSummary;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MasterSummaryResource masterSummaryResource = new MasterSummaryResource(masterSummaryRepository, mockMasterSummarySearchRepository);
        this.restMasterSummaryMockMvc = MockMvcBuilders.standaloneSetup(masterSummaryResource)
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
    public static MasterSummary createEntity(EntityManager em) {
        MasterSummary masterSummary = new MasterSummary()
            .proofGallons(DEFAULT_PROOF_GALLONS)
            .actualBarrelCount(DEFAULT_ACTUAL_BARREL_COUNT);
        return masterSummary;
    }

    @Before
    public void initTest() {
        masterSummary = createEntity(em);
    }

    @Test
    @Transactional
    public void createMasterSummary() throws Exception {
        int databaseSizeBeforeCreate = masterSummaryRepository.findAll().size();

        // Create the MasterSummary
        restMasterSummaryMockMvc.perform(post("/api/master-summaries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(masterSummary)))
            .andExpect(status().isCreated());

        // Validate the MasterSummary in the database
        List<MasterSummary> masterSummaryList = masterSummaryRepository.findAll();
        assertThat(masterSummaryList).hasSize(databaseSizeBeforeCreate + 1);
        MasterSummary testMasterSummary = masterSummaryList.get(masterSummaryList.size() - 1);
        assertThat(testMasterSummary.getProofGallons()).isEqualTo(DEFAULT_PROOF_GALLONS);
        assertThat(testMasterSummary.getActualBarrelCount()).isEqualTo(DEFAULT_ACTUAL_BARREL_COUNT);

        // Validate the MasterSummary in Elasticsearch
        verify(mockMasterSummarySearchRepository, times(1)).save(testMasterSummary);
    }

    @Test
    @Transactional
    public void createMasterSummaryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = masterSummaryRepository.findAll().size();

        // Create the MasterSummary with an existing ID
        masterSummary.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMasterSummaryMockMvc.perform(post("/api/master-summaries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(masterSummary)))
            .andExpect(status().isBadRequest());

        // Validate the MasterSummary in the database
        List<MasterSummary> masterSummaryList = masterSummaryRepository.findAll();
        assertThat(masterSummaryList).hasSize(databaseSizeBeforeCreate);

        // Validate the MasterSummary in Elasticsearch
        verify(mockMasterSummarySearchRepository, times(0)).save(masterSummary);
    }

    @Test
    @Transactional
    public void getAllMasterSummaries() throws Exception {
        // Initialize the database
        masterSummaryRepository.saveAndFlush(masterSummary);

        // Get all the masterSummaryList
        restMasterSummaryMockMvc.perform(get("/api/master-summaries?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(masterSummary.getId().intValue())))
            .andExpect(jsonPath("$.[*].proofGallons").value(hasItem(DEFAULT_PROOF_GALLONS)))
            .andExpect(jsonPath("$.[*].actualBarrelCount").value(hasItem(DEFAULT_ACTUAL_BARREL_COUNT)));
    }
    
    @Test
    @Transactional
    public void getMasterSummary() throws Exception {
        // Initialize the database
        masterSummaryRepository.saveAndFlush(masterSummary);

        // Get the masterSummary
        restMasterSummaryMockMvc.perform(get("/api/master-summaries/{id}", masterSummary.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(masterSummary.getId().intValue()))
            .andExpect(jsonPath("$.proofGallons").value(DEFAULT_PROOF_GALLONS))
            .andExpect(jsonPath("$.actualBarrelCount").value(DEFAULT_ACTUAL_BARREL_COUNT));
    }

    @Test
    @Transactional
    public void getNonExistingMasterSummary() throws Exception {
        // Get the masterSummary
        restMasterSummaryMockMvc.perform(get("/api/master-summaries/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMasterSummary() throws Exception {
        // Initialize the database
        masterSummaryRepository.saveAndFlush(masterSummary);

        int databaseSizeBeforeUpdate = masterSummaryRepository.findAll().size();

        // Update the masterSummary
        MasterSummary updatedMasterSummary = masterSummaryRepository.findById(masterSummary.getId()).get();
        // Disconnect from session so that the updates on updatedMasterSummary are not directly saved in db
        em.detach(updatedMasterSummary);
        updatedMasterSummary
            .proofGallons(UPDATED_PROOF_GALLONS)
            .actualBarrelCount(UPDATED_ACTUAL_BARREL_COUNT);

        restMasterSummaryMockMvc.perform(put("/api/master-summaries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMasterSummary)))
            .andExpect(status().isOk());

        // Validate the MasterSummary in the database
        List<MasterSummary> masterSummaryList = masterSummaryRepository.findAll();
        assertThat(masterSummaryList).hasSize(databaseSizeBeforeUpdate);
        MasterSummary testMasterSummary = masterSummaryList.get(masterSummaryList.size() - 1);
        assertThat(testMasterSummary.getProofGallons()).isEqualTo(UPDATED_PROOF_GALLONS);
        assertThat(testMasterSummary.getActualBarrelCount()).isEqualTo(UPDATED_ACTUAL_BARREL_COUNT);

        // Validate the MasterSummary in Elasticsearch
        verify(mockMasterSummarySearchRepository, times(1)).save(testMasterSummary);
    }

    @Test
    @Transactional
    public void updateNonExistingMasterSummary() throws Exception {
        int databaseSizeBeforeUpdate = masterSummaryRepository.findAll().size();

        // Create the MasterSummary

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMasterSummaryMockMvc.perform(put("/api/master-summaries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(masterSummary)))
            .andExpect(status().isBadRequest());

        // Validate the MasterSummary in the database
        List<MasterSummary> masterSummaryList = masterSummaryRepository.findAll();
        assertThat(masterSummaryList).hasSize(databaseSizeBeforeUpdate);

        // Validate the MasterSummary in Elasticsearch
        verify(mockMasterSummarySearchRepository, times(0)).save(masterSummary);
    }

    @Test
    @Transactional
    public void deleteMasterSummary() throws Exception {
        // Initialize the database
        masterSummaryRepository.saveAndFlush(masterSummary);

        int databaseSizeBeforeDelete = masterSummaryRepository.findAll().size();

        // Delete the masterSummary
        restMasterSummaryMockMvc.perform(delete("/api/master-summaries/{id}", masterSummary.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MasterSummary> masterSummaryList = masterSummaryRepository.findAll();
        assertThat(masterSummaryList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the MasterSummary in Elasticsearch
        verify(mockMasterSummarySearchRepository, times(1)).deleteById(masterSummary.getId());
    }

    @Test
    @Transactional
    public void searchMasterSummary() throws Exception {
        // Initialize the database
        masterSummaryRepository.saveAndFlush(masterSummary);
        when(mockMasterSummarySearchRepository.search(queryStringQuery("id:" + masterSummary.getId())))
            .thenReturn(Collections.singletonList(masterSummary));
        // Search the masterSummary
        restMasterSummaryMockMvc.perform(get("/api/_search/master-summaries?query=id:" + masterSummary.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(masterSummary.getId().intValue())))
            .andExpect(jsonPath("$.[*].proofGallons").value(hasItem(DEFAULT_PROOF_GALLONS)))
            .andExpect(jsonPath("$.[*].actualBarrelCount").value(hasItem(DEFAULT_ACTUAL_BARREL_COUNT)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MasterSummary.class);
        MasterSummary masterSummary1 = new MasterSummary();
        masterSummary1.setId(1L);
        MasterSummary masterSummary2 = new MasterSummary();
        masterSummary2.setId(masterSummary1.getId());
        assertThat(masterSummary1).isEqualTo(masterSummary2);
        masterSummary2.setId(2L);
        assertThat(masterSummary1).isNotEqualTo(masterSummary2);
        masterSummary1.setId(null);
        assertThat(masterSummary1).isNotEqualTo(masterSummary2);
    }
}

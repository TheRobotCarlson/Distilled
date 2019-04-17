package com.therobotcarlson.distilled.web.rest;

import com.therobotcarlson.distilled.DistilledApp;

import com.therobotcarlson.distilled.domain.ProductionSchedule;
import com.therobotcarlson.distilled.repository.ProductionScheduleRepository;
import com.therobotcarlson.distilled.repository.search.ProductionScheduleSearchRepository;
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
 * Test class for the ProductionScheduleResource REST controller.
 *
 * @see ProductionScheduleResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DistilledApp.class)
public class ProductionScheduleResourceIntTest {

    private static final Integer DEFAULT_PROOF_GALLONS = 1;
    private static final Integer UPDATED_PROOF_GALLONS = 2;

    private static final Integer DEFAULT_ACTUAL_BARREL_COUNT = 1;
    private static final Integer UPDATED_ACTUAL_BARREL_COUNT = 2;

    @Autowired
    private ProductionScheduleRepository productionScheduleRepository;

    /**
     * This repository is mocked in the com.therobotcarlson.distilled.repository.search test package.
     *
     * @see com.therobotcarlson.distilled.repository.search.ProductionScheduleSearchRepositoryMockConfiguration
     */
    @Autowired
    private ProductionScheduleSearchRepository mockProductionScheduleSearchRepository;

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

    private MockMvc restProductionScheduleMockMvc;

    private ProductionSchedule productionSchedule;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProductionScheduleResource productionScheduleResource = new ProductionScheduleResource(productionScheduleRepository, mockProductionScheduleSearchRepository);
        this.restProductionScheduleMockMvc = MockMvcBuilders.standaloneSetup(productionScheduleResource)
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
    public static ProductionSchedule createEntity(EntityManager em) {
        ProductionSchedule productionSchedule = new ProductionSchedule()
            .proofGallons(DEFAULT_PROOF_GALLONS)
            .actualBarrelCount(DEFAULT_ACTUAL_BARREL_COUNT);
        return productionSchedule;
    }

    @Before
    public void initTest() {
        productionSchedule = createEntity(em);
    }

    @Test
    @Transactional
    public void createProductionSchedule() throws Exception {
        int databaseSizeBeforeCreate = productionScheduleRepository.findAll().size();

        // Create the ProductionSchedule
        restProductionScheduleMockMvc.perform(post("/api/production-schedules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productionSchedule)))
            .andExpect(status().isCreated());

        // Validate the ProductionSchedule in the database
        List<ProductionSchedule> productionScheduleList = productionScheduleRepository.findAll();
        assertThat(productionScheduleList).hasSize(databaseSizeBeforeCreate + 1);
        ProductionSchedule testProductionSchedule = productionScheduleList.get(productionScheduleList.size() - 1);
        assertThat(testProductionSchedule.getProofGallons()).isEqualTo(DEFAULT_PROOF_GALLONS);
        assertThat(testProductionSchedule.getActualBarrelCount()).isEqualTo(DEFAULT_ACTUAL_BARREL_COUNT);

        // Validate the ProductionSchedule in Elasticsearch
        verify(mockProductionScheduleSearchRepository, times(1)).save(testProductionSchedule);
    }

    @Test
    @Transactional
    public void createProductionScheduleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productionScheduleRepository.findAll().size();

        // Create the ProductionSchedule with an existing ID
        productionSchedule.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductionScheduleMockMvc.perform(post("/api/production-schedules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productionSchedule)))
            .andExpect(status().isBadRequest());

        // Validate the ProductionSchedule in the database
        List<ProductionSchedule> productionScheduleList = productionScheduleRepository.findAll();
        assertThat(productionScheduleList).hasSize(databaseSizeBeforeCreate);

        // Validate the ProductionSchedule in Elasticsearch
        verify(mockProductionScheduleSearchRepository, times(0)).save(productionSchedule);
    }

    @Test
    @Transactional
    public void getAllProductionSchedules() throws Exception {
        // Initialize the database
        productionScheduleRepository.saveAndFlush(productionSchedule);

        // Get all the productionScheduleList
        restProductionScheduleMockMvc.perform(get("/api/production-schedules?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productionSchedule.getId().intValue())))
            .andExpect(jsonPath("$.[*].proofGallons").value(hasItem(DEFAULT_PROOF_GALLONS)))
            .andExpect(jsonPath("$.[*].actualBarrelCount").value(hasItem(DEFAULT_ACTUAL_BARREL_COUNT)));
    }
    
    @Test
    @Transactional
    public void getProductionSchedule() throws Exception {
        // Initialize the database
        productionScheduleRepository.saveAndFlush(productionSchedule);

        // Get the productionSchedule
        restProductionScheduleMockMvc.perform(get("/api/production-schedules/{id}", productionSchedule.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(productionSchedule.getId().intValue()))
            .andExpect(jsonPath("$.proofGallons").value(DEFAULT_PROOF_GALLONS))
            .andExpect(jsonPath("$.actualBarrelCount").value(DEFAULT_ACTUAL_BARREL_COUNT));
    }

    @Test
    @Transactional
    public void getNonExistingProductionSchedule() throws Exception {
        // Get the productionSchedule
        restProductionScheduleMockMvc.perform(get("/api/production-schedules/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProductionSchedule() throws Exception {
        // Initialize the database
        productionScheduleRepository.saveAndFlush(productionSchedule);

        int databaseSizeBeforeUpdate = productionScheduleRepository.findAll().size();

        // Update the productionSchedule
        ProductionSchedule updatedProductionSchedule = productionScheduleRepository.findById(productionSchedule.getId()).get();
        // Disconnect from session so that the updates on updatedProductionSchedule are not directly saved in db
        em.detach(updatedProductionSchedule);
        updatedProductionSchedule
            .proofGallons(UPDATED_PROOF_GALLONS)
            .actualBarrelCount(UPDATED_ACTUAL_BARREL_COUNT);

        restProductionScheduleMockMvc.perform(put("/api/production-schedules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProductionSchedule)))
            .andExpect(status().isOk());

        // Validate the ProductionSchedule in the database
        List<ProductionSchedule> productionScheduleList = productionScheduleRepository.findAll();
        assertThat(productionScheduleList).hasSize(databaseSizeBeforeUpdate);
        ProductionSchedule testProductionSchedule = productionScheduleList.get(productionScheduleList.size() - 1);
        assertThat(testProductionSchedule.getProofGallons()).isEqualTo(UPDATED_PROOF_GALLONS);
        assertThat(testProductionSchedule.getActualBarrelCount()).isEqualTo(UPDATED_ACTUAL_BARREL_COUNT);

        // Validate the ProductionSchedule in Elasticsearch
        verify(mockProductionScheduleSearchRepository, times(1)).save(testProductionSchedule);
    }

    @Test
    @Transactional
    public void updateNonExistingProductionSchedule() throws Exception {
        int databaseSizeBeforeUpdate = productionScheduleRepository.findAll().size();

        // Create the ProductionSchedule

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductionScheduleMockMvc.perform(put("/api/production-schedules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productionSchedule)))
            .andExpect(status().isBadRequest());

        // Validate the ProductionSchedule in the database
        List<ProductionSchedule> productionScheduleList = productionScheduleRepository.findAll();
        assertThat(productionScheduleList).hasSize(databaseSizeBeforeUpdate);

        // Validate the ProductionSchedule in Elasticsearch
        verify(mockProductionScheduleSearchRepository, times(0)).save(productionSchedule);
    }

    @Test
    @Transactional
    public void deleteProductionSchedule() throws Exception {
        // Initialize the database
        productionScheduleRepository.saveAndFlush(productionSchedule);

        int databaseSizeBeforeDelete = productionScheduleRepository.findAll().size();

        // Delete the productionSchedule
        restProductionScheduleMockMvc.perform(delete("/api/production-schedules/{id}", productionSchedule.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ProductionSchedule> productionScheduleList = productionScheduleRepository.findAll();
        assertThat(productionScheduleList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the ProductionSchedule in Elasticsearch
        verify(mockProductionScheduleSearchRepository, times(1)).deleteById(productionSchedule.getId());
    }

    @Test
    @Transactional
    public void searchProductionSchedule() throws Exception {
        // Initialize the database
        productionScheduleRepository.saveAndFlush(productionSchedule);
        when(mockProductionScheduleSearchRepository.search(queryStringQuery("id:" + productionSchedule.getId())))
            .thenReturn(Collections.singletonList(productionSchedule));
        // Search the productionSchedule
        restProductionScheduleMockMvc.perform(get("/api/_search/production-schedules?query=id:" + productionSchedule.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productionSchedule.getId().intValue())))
            .andExpect(jsonPath("$.[*].proofGallons").value(hasItem(DEFAULT_PROOF_GALLONS)))
            .andExpect(jsonPath("$.[*].actualBarrelCount").value(hasItem(DEFAULT_ACTUAL_BARREL_COUNT)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductionSchedule.class);
        ProductionSchedule productionSchedule1 = new ProductionSchedule();
        productionSchedule1.setId(1L);
        ProductionSchedule productionSchedule2 = new ProductionSchedule();
        productionSchedule2.setId(productionSchedule1.getId());
        assertThat(productionSchedule1).isEqualTo(productionSchedule2);
        productionSchedule2.setId(2L);
        assertThat(productionSchedule1).isNotEqualTo(productionSchedule2);
        productionSchedule1.setId(null);
        assertThat(productionSchedule1).isNotEqualTo(productionSchedule2);
    }
}

package com.therobotcarlson.distilled.web.rest;

import com.therobotcarlson.distilled.DistilledApp;

import com.therobotcarlson.distilled.domain.ProductionSummary;
import com.therobotcarlson.distilled.repository.ProductionSummaryRepository;
import com.therobotcarlson.distilled.repository.search.ProductionSummarySearchRepository;
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
 * Test class for the ProductionSummaryResource REST controller.
 *
 * @see ProductionSummaryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DistilledApp.class)
public class ProductionSummaryResourceIntTest {

    @Autowired
    private ProductionSummaryRepository productionSummaryRepository;

    /**
     * This repository is mocked in the com.therobotcarlson.distilled.repository.search test package.
     *
     * @see com.therobotcarlson.distilled.repository.search.ProductionSummarySearchRepositoryMockConfiguration
     */
    @Autowired
    private ProductionSummarySearchRepository mockProductionSummarySearchRepository;

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

    private MockMvc restProductionSummaryMockMvc;

    private ProductionSummary productionSummary;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProductionSummaryResource productionSummaryResource = new ProductionSummaryResource(productionSummaryRepository, mockProductionSummarySearchRepository);
        this.restProductionSummaryMockMvc = MockMvcBuilders.standaloneSetup(productionSummaryResource)
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
    public static ProductionSummary createEntity(EntityManager em) {
        ProductionSummary productionSummary = new ProductionSummary();
        return productionSummary;
    }

    @Before
    public void initTest() {
        productionSummary = createEntity(em);
    }

    @Test
    @Transactional
    public void createProductionSummary() throws Exception {
        int databaseSizeBeforeCreate = productionSummaryRepository.findAll().size();

        // Create the ProductionSummary
        restProductionSummaryMockMvc.perform(post("/api/production-summaries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productionSummary)))
            .andExpect(status().isCreated());

        // Validate the ProductionSummary in the database
        List<ProductionSummary> productionSummaryList = productionSummaryRepository.findAll();
        assertThat(productionSummaryList).hasSize(databaseSizeBeforeCreate + 1);
        ProductionSummary testProductionSummary = productionSummaryList.get(productionSummaryList.size() - 1);

        // Validate the ProductionSummary in Elasticsearch
        verify(mockProductionSummarySearchRepository, times(1)).save(testProductionSummary);
    }

    @Test
    @Transactional
    public void createProductionSummaryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productionSummaryRepository.findAll().size();

        // Create the ProductionSummary with an existing ID
        productionSummary.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductionSummaryMockMvc.perform(post("/api/production-summaries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productionSummary)))
            .andExpect(status().isBadRequest());

        // Validate the ProductionSummary in the database
        List<ProductionSummary> productionSummaryList = productionSummaryRepository.findAll();
        assertThat(productionSummaryList).hasSize(databaseSizeBeforeCreate);

        // Validate the ProductionSummary in Elasticsearch
        verify(mockProductionSummarySearchRepository, times(0)).save(productionSummary);
    }

    @Test
    @Transactional
    public void getAllProductionSummaries() throws Exception {
        // Initialize the database
        productionSummaryRepository.saveAndFlush(productionSummary);

        // Get all the productionSummaryList
        restProductionSummaryMockMvc.perform(get("/api/production-summaries?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productionSummary.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getProductionSummary() throws Exception {
        // Initialize the database
        productionSummaryRepository.saveAndFlush(productionSummary);

        // Get the productionSummary
        restProductionSummaryMockMvc.perform(get("/api/production-summaries/{id}", productionSummary.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(productionSummary.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingProductionSummary() throws Exception {
        // Get the productionSummary
        restProductionSummaryMockMvc.perform(get("/api/production-summaries/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProductionSummary() throws Exception {
        // Initialize the database
        productionSummaryRepository.saveAndFlush(productionSummary);

        int databaseSizeBeforeUpdate = productionSummaryRepository.findAll().size();

        // Update the productionSummary
        ProductionSummary updatedProductionSummary = productionSummaryRepository.findById(productionSummary.getId()).get();
        // Disconnect from session so that the updates on updatedProductionSummary are not directly saved in db
        em.detach(updatedProductionSummary);

        restProductionSummaryMockMvc.perform(put("/api/production-summaries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProductionSummary)))
            .andExpect(status().isOk());

        // Validate the ProductionSummary in the database
        List<ProductionSummary> productionSummaryList = productionSummaryRepository.findAll();
        assertThat(productionSummaryList).hasSize(databaseSizeBeforeUpdate);
        ProductionSummary testProductionSummary = productionSummaryList.get(productionSummaryList.size() - 1);

        // Validate the ProductionSummary in Elasticsearch
        verify(mockProductionSummarySearchRepository, times(1)).save(testProductionSummary);
    }

    @Test
    @Transactional
    public void updateNonExistingProductionSummary() throws Exception {
        int databaseSizeBeforeUpdate = productionSummaryRepository.findAll().size();

        // Create the ProductionSummary

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductionSummaryMockMvc.perform(put("/api/production-summaries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productionSummary)))
            .andExpect(status().isBadRequest());

        // Validate the ProductionSummary in the database
        List<ProductionSummary> productionSummaryList = productionSummaryRepository.findAll();
        assertThat(productionSummaryList).hasSize(databaseSizeBeforeUpdate);

        // Validate the ProductionSummary in Elasticsearch
        verify(mockProductionSummarySearchRepository, times(0)).save(productionSummary);
    }

    @Test
    @Transactional
    public void deleteProductionSummary() throws Exception {
        // Initialize the database
        productionSummaryRepository.saveAndFlush(productionSummary);

        int databaseSizeBeforeDelete = productionSummaryRepository.findAll().size();

        // Delete the productionSummary
        restProductionSummaryMockMvc.perform(delete("/api/production-summaries/{id}", productionSummary.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ProductionSummary> productionSummaryList = productionSummaryRepository.findAll();
        assertThat(productionSummaryList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the ProductionSummary in Elasticsearch
        verify(mockProductionSummarySearchRepository, times(1)).deleteById(productionSummary.getId());
    }

    @Test
    @Transactional
    public void searchProductionSummary() throws Exception {
        // Initialize the database
        productionSummaryRepository.saveAndFlush(productionSummary);
        when(mockProductionSummarySearchRepository.search(queryStringQuery("id:" + productionSummary.getId())))
            .thenReturn(Collections.singletonList(productionSummary));
        // Search the productionSummary
        restProductionSummaryMockMvc.perform(get("/api/_search/production-summaries?query=id:" + productionSummary.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productionSummary.getId().intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductionSummary.class);
        ProductionSummary productionSummary1 = new ProductionSummary();
        productionSummary1.setId(1L);
        ProductionSummary productionSummary2 = new ProductionSummary();
        productionSummary2.setId(productionSummary1.getId());
        assertThat(productionSummary1).isEqualTo(productionSummary2);
        productionSummary2.setId(2L);
        assertThat(productionSummary1).isNotEqualTo(productionSummary2);
        productionSummary1.setId(null);
        assertThat(productionSummary1).isNotEqualTo(productionSummary2);
    }
}

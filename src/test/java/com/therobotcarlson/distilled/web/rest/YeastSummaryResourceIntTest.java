package com.therobotcarlson.distilled.web.rest;

import com.therobotcarlson.distilled.DistilledApp;

import com.therobotcarlson.distilled.domain.YeastSummary;
import com.therobotcarlson.distilled.repository.YeastSummaryRepository;
import com.therobotcarlson.distilled.repository.search.YeastSummarySearchRepository;
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
 * Test class for the YeastSummaryResource REST controller.
 *
 * @see YeastSummaryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DistilledApp.class)
public class YeastSummaryResourceIntTest {

    @Autowired
    private YeastSummaryRepository yeastSummaryRepository;

    /**
     * This repository is mocked in the com.therobotcarlson.distilled.repository.search test package.
     *
     * @see com.therobotcarlson.distilled.repository.search.YeastSummarySearchRepositoryMockConfiguration
     */
    @Autowired
    private YeastSummarySearchRepository mockYeastSummarySearchRepository;

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

    private MockMvc restYeastSummaryMockMvc;

    private YeastSummary yeastSummary;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final YeastSummaryResource yeastSummaryResource = new YeastSummaryResource(yeastSummaryRepository, mockYeastSummarySearchRepository);
        this.restYeastSummaryMockMvc = MockMvcBuilders.standaloneSetup(yeastSummaryResource)
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
    public static YeastSummary createEntity(EntityManager em) {
        YeastSummary yeastSummary = new YeastSummary();
        return yeastSummary;
    }

    @Before
    public void initTest() {
        yeastSummary = createEntity(em);
    }

    @Test
    @Transactional
    public void createYeastSummary() throws Exception {
        int databaseSizeBeforeCreate = yeastSummaryRepository.findAll().size();

        // Create the YeastSummary
        restYeastSummaryMockMvc.perform(post("/api/yeast-summaries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(yeastSummary)))
            .andExpect(status().isCreated());

        // Validate the YeastSummary in the database
        List<YeastSummary> yeastSummaryList = yeastSummaryRepository.findAll();
        assertThat(yeastSummaryList).hasSize(databaseSizeBeforeCreate + 1);
        YeastSummary testYeastSummary = yeastSummaryList.get(yeastSummaryList.size() - 1);

        // Validate the YeastSummary in Elasticsearch
        verify(mockYeastSummarySearchRepository, times(1)).save(testYeastSummary);
    }

    @Test
    @Transactional
    public void createYeastSummaryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = yeastSummaryRepository.findAll().size();

        // Create the YeastSummary with an existing ID
        yeastSummary.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restYeastSummaryMockMvc.perform(post("/api/yeast-summaries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(yeastSummary)))
            .andExpect(status().isBadRequest());

        // Validate the YeastSummary in the database
        List<YeastSummary> yeastSummaryList = yeastSummaryRepository.findAll();
        assertThat(yeastSummaryList).hasSize(databaseSizeBeforeCreate);

        // Validate the YeastSummary in Elasticsearch
        verify(mockYeastSummarySearchRepository, times(0)).save(yeastSummary);
    }

    @Test
    @Transactional
    public void getAllYeastSummaries() throws Exception {
        // Initialize the database
        yeastSummaryRepository.saveAndFlush(yeastSummary);

        // Get all the yeastSummaryList
        restYeastSummaryMockMvc.perform(get("/api/yeast-summaries?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(yeastSummary.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getYeastSummary() throws Exception {
        // Initialize the database
        yeastSummaryRepository.saveAndFlush(yeastSummary);

        // Get the yeastSummary
        restYeastSummaryMockMvc.perform(get("/api/yeast-summaries/{id}", yeastSummary.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(yeastSummary.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingYeastSummary() throws Exception {
        // Get the yeastSummary
        restYeastSummaryMockMvc.perform(get("/api/yeast-summaries/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateYeastSummary() throws Exception {
        // Initialize the database
        yeastSummaryRepository.saveAndFlush(yeastSummary);

        int databaseSizeBeforeUpdate = yeastSummaryRepository.findAll().size();

        // Update the yeastSummary
        YeastSummary updatedYeastSummary = yeastSummaryRepository.findById(yeastSummary.getId()).get();
        // Disconnect from session so that the updates on updatedYeastSummary are not directly saved in db
        em.detach(updatedYeastSummary);

        restYeastSummaryMockMvc.perform(put("/api/yeast-summaries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedYeastSummary)))
            .andExpect(status().isOk());

        // Validate the YeastSummary in the database
        List<YeastSummary> yeastSummaryList = yeastSummaryRepository.findAll();
        assertThat(yeastSummaryList).hasSize(databaseSizeBeforeUpdate);
        YeastSummary testYeastSummary = yeastSummaryList.get(yeastSummaryList.size() - 1);

        // Validate the YeastSummary in Elasticsearch
        verify(mockYeastSummarySearchRepository, times(1)).save(testYeastSummary);
    }

    @Test
    @Transactional
    public void updateNonExistingYeastSummary() throws Exception {
        int databaseSizeBeforeUpdate = yeastSummaryRepository.findAll().size();

        // Create the YeastSummary

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restYeastSummaryMockMvc.perform(put("/api/yeast-summaries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(yeastSummary)))
            .andExpect(status().isBadRequest());

        // Validate the YeastSummary in the database
        List<YeastSummary> yeastSummaryList = yeastSummaryRepository.findAll();
        assertThat(yeastSummaryList).hasSize(databaseSizeBeforeUpdate);

        // Validate the YeastSummary in Elasticsearch
        verify(mockYeastSummarySearchRepository, times(0)).save(yeastSummary);
    }

    @Test
    @Transactional
    public void deleteYeastSummary() throws Exception {
        // Initialize the database
        yeastSummaryRepository.saveAndFlush(yeastSummary);

        int databaseSizeBeforeDelete = yeastSummaryRepository.findAll().size();

        // Delete the yeastSummary
        restYeastSummaryMockMvc.perform(delete("/api/yeast-summaries/{id}", yeastSummary.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<YeastSummary> yeastSummaryList = yeastSummaryRepository.findAll();
        assertThat(yeastSummaryList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the YeastSummary in Elasticsearch
        verify(mockYeastSummarySearchRepository, times(1)).deleteById(yeastSummary.getId());
    }

    @Test
    @Transactional
    public void searchYeastSummary() throws Exception {
        // Initialize the database
        yeastSummaryRepository.saveAndFlush(yeastSummary);
        when(mockYeastSummarySearchRepository.search(queryStringQuery("id:" + yeastSummary.getId())))
            .thenReturn(Collections.singletonList(yeastSummary));
        // Search the yeastSummary
        restYeastSummaryMockMvc.perform(get("/api/_search/yeast-summaries?query=id:" + yeastSummary.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(yeastSummary.getId().intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(YeastSummary.class);
        YeastSummary yeastSummary1 = new YeastSummary();
        yeastSummary1.setId(1L);
        YeastSummary yeastSummary2 = new YeastSummary();
        yeastSummary2.setId(yeastSummary1.getId());
        assertThat(yeastSummary1).isEqualTo(yeastSummary2);
        yeastSummary2.setId(2L);
        assertThat(yeastSummary1).isNotEqualTo(yeastSummary2);
        yeastSummary1.setId(null);
        assertThat(yeastSummary1).isNotEqualTo(yeastSummary2);
    }
}

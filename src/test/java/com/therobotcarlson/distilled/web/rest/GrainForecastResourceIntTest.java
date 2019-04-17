package com.therobotcarlson.distilled.web.rest;

import com.therobotcarlson.distilled.DistilledApp;

import com.therobotcarlson.distilled.domain.GrainForecast;
import com.therobotcarlson.distilled.repository.GrainForecastRepository;
import com.therobotcarlson.distilled.repository.search.GrainForecastSearchRepository;
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
 * Test class for the GrainForecastResource REST controller.
 *
 * @see GrainForecastResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DistilledApp.class)
public class GrainForecastResourceIntTest {

    @Autowired
    private GrainForecastRepository grainForecastRepository;

    /**
     * This repository is mocked in the com.therobotcarlson.distilled.repository.search test package.
     *
     * @see com.therobotcarlson.distilled.repository.search.GrainForecastSearchRepositoryMockConfiguration
     */
    @Autowired
    private GrainForecastSearchRepository mockGrainForecastSearchRepository;

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

    private MockMvc restGrainForecastMockMvc;

    private GrainForecast grainForecast;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GrainForecastResource grainForecastResource = new GrainForecastResource(grainForecastRepository, mockGrainForecastSearchRepository);
        this.restGrainForecastMockMvc = MockMvcBuilders.standaloneSetup(grainForecastResource)
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
    public static GrainForecast createEntity(EntityManager em) {
        GrainForecast grainForecast = new GrainForecast();
        return grainForecast;
    }

    @Before
    public void initTest() {
        grainForecast = createEntity(em);
    }

    @Test
    @Transactional
    public void createGrainForecast() throws Exception {
        int databaseSizeBeforeCreate = grainForecastRepository.findAll().size();

        // Create the GrainForecast
        restGrainForecastMockMvc.perform(post("/api/grain-forecasts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(grainForecast)))
            .andExpect(status().isCreated());

        // Validate the GrainForecast in the database
        List<GrainForecast> grainForecastList = grainForecastRepository.findAll();
        assertThat(grainForecastList).hasSize(databaseSizeBeforeCreate + 1);
        GrainForecast testGrainForecast = grainForecastList.get(grainForecastList.size() - 1);

        // Validate the GrainForecast in Elasticsearch
        verify(mockGrainForecastSearchRepository, times(1)).save(testGrainForecast);
    }

    @Test
    @Transactional
    public void createGrainForecastWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = grainForecastRepository.findAll().size();

        // Create the GrainForecast with an existing ID
        grainForecast.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGrainForecastMockMvc.perform(post("/api/grain-forecasts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(grainForecast)))
            .andExpect(status().isBadRequest());

        // Validate the GrainForecast in the database
        List<GrainForecast> grainForecastList = grainForecastRepository.findAll();
        assertThat(grainForecastList).hasSize(databaseSizeBeforeCreate);

        // Validate the GrainForecast in Elasticsearch
        verify(mockGrainForecastSearchRepository, times(0)).save(grainForecast);
    }

    @Test
    @Transactional
    public void getAllGrainForecasts() throws Exception {
        // Initialize the database
        grainForecastRepository.saveAndFlush(grainForecast);

        // Get all the grainForecastList
        restGrainForecastMockMvc.perform(get("/api/grain-forecasts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(grainForecast.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getGrainForecast() throws Exception {
        // Initialize the database
        grainForecastRepository.saveAndFlush(grainForecast);

        // Get the grainForecast
        restGrainForecastMockMvc.perform(get("/api/grain-forecasts/{id}", grainForecast.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(grainForecast.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingGrainForecast() throws Exception {
        // Get the grainForecast
        restGrainForecastMockMvc.perform(get("/api/grain-forecasts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGrainForecast() throws Exception {
        // Initialize the database
        grainForecastRepository.saveAndFlush(grainForecast);

        int databaseSizeBeforeUpdate = grainForecastRepository.findAll().size();

        // Update the grainForecast
        GrainForecast updatedGrainForecast = grainForecastRepository.findById(grainForecast.getId()).get();
        // Disconnect from session so that the updates on updatedGrainForecast are not directly saved in db
        em.detach(updatedGrainForecast);

        restGrainForecastMockMvc.perform(put("/api/grain-forecasts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedGrainForecast)))
            .andExpect(status().isOk());

        // Validate the GrainForecast in the database
        List<GrainForecast> grainForecastList = grainForecastRepository.findAll();
        assertThat(grainForecastList).hasSize(databaseSizeBeforeUpdate);
        GrainForecast testGrainForecast = grainForecastList.get(grainForecastList.size() - 1);

        // Validate the GrainForecast in Elasticsearch
        verify(mockGrainForecastSearchRepository, times(1)).save(testGrainForecast);
    }

    @Test
    @Transactional
    public void updateNonExistingGrainForecast() throws Exception {
        int databaseSizeBeforeUpdate = grainForecastRepository.findAll().size();

        // Create the GrainForecast

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGrainForecastMockMvc.perform(put("/api/grain-forecasts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(grainForecast)))
            .andExpect(status().isBadRequest());

        // Validate the GrainForecast in the database
        List<GrainForecast> grainForecastList = grainForecastRepository.findAll();
        assertThat(grainForecastList).hasSize(databaseSizeBeforeUpdate);

        // Validate the GrainForecast in Elasticsearch
        verify(mockGrainForecastSearchRepository, times(0)).save(grainForecast);
    }

    @Test
    @Transactional
    public void deleteGrainForecast() throws Exception {
        // Initialize the database
        grainForecastRepository.saveAndFlush(grainForecast);

        int databaseSizeBeforeDelete = grainForecastRepository.findAll().size();

        // Delete the grainForecast
        restGrainForecastMockMvc.perform(delete("/api/grain-forecasts/{id}", grainForecast.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GrainForecast> grainForecastList = grainForecastRepository.findAll();
        assertThat(grainForecastList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the GrainForecast in Elasticsearch
        verify(mockGrainForecastSearchRepository, times(1)).deleteById(grainForecast.getId());
    }

    @Test
    @Transactional
    public void searchGrainForecast() throws Exception {
        // Initialize the database
        grainForecastRepository.saveAndFlush(grainForecast);
        when(mockGrainForecastSearchRepository.search(queryStringQuery("id:" + grainForecast.getId())))
            .thenReturn(Collections.singletonList(grainForecast));
        // Search the grainForecast
        restGrainForecastMockMvc.perform(get("/api/_search/grain-forecasts?query=id:" + grainForecast.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(grainForecast.getId().intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GrainForecast.class);
        GrainForecast grainForecast1 = new GrainForecast();
        grainForecast1.setId(1L);
        GrainForecast grainForecast2 = new GrainForecast();
        grainForecast2.setId(grainForecast1.getId());
        assertThat(grainForecast1).isEqualTo(grainForecast2);
        grainForecast2.setId(2L);
        assertThat(grainForecast1).isNotEqualTo(grainForecast2);
        grainForecast1.setId(null);
        assertThat(grainForecast1).isNotEqualTo(grainForecast2);
    }
}

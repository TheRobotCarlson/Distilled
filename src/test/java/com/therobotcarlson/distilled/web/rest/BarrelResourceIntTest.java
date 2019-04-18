package com.therobotcarlson.distilled.web.rest;

import com.therobotcarlson.distilled.DistilledApp;

import com.therobotcarlson.distilled.domain.Barrel;
import com.therobotcarlson.distilled.repository.BarrelRepository;
import com.therobotcarlson.distilled.repository.search.BarrelSearchRepository;
import com.therobotcarlson.distilled.service.BarrelService;
import com.therobotcarlson.distilled.service.dto.BarrelDTO;
import com.therobotcarlson.distilled.service.mapper.BarrelMapper;
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
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.Collections;
import java.util.List;


import static com.therobotcarlson.distilled.web.rest.TestUtil.sameInstant;
import static com.therobotcarlson.distilled.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the BarrelResource REST controller.
 *
 * @see BarrelResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DistilledApp.class)
public class BarrelResourceIntTest {

    private static final ZonedDateTime DEFAULT_BARRELED_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_BARRELED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private BarrelRepository barrelRepository;

    @Autowired
    private BarrelMapper barrelMapper;

    @Autowired
    private BarrelService barrelService;

    /**
     * This repository is mocked in the com.therobotcarlson.distilled.repository.search test package.
     *
     * @see com.therobotcarlson.distilled.repository.search.BarrelSearchRepositoryMockConfiguration
     */
    @Autowired
    private BarrelSearchRepository mockBarrelSearchRepository;

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

    private MockMvc restBarrelMockMvc;

    private Barrel barrel;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BarrelResource barrelResource = new BarrelResource(barrelService);
        this.restBarrelMockMvc = MockMvcBuilders.standaloneSetup(barrelResource)
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
    public static Barrel createEntity(EntityManager em) {
        Barrel barrel = new Barrel()
            .barreledDate(DEFAULT_BARRELED_DATE);
        return barrel;
    }

    @Before
    public void initTest() {
        barrel = createEntity(em);
    }

    @Test
    @Transactional
    public void createBarrel() throws Exception {
        int databaseSizeBeforeCreate = barrelRepository.findAll().size();

        // Create the Barrel
        BarrelDTO barrelDTO = barrelMapper.toDto(barrel);
        restBarrelMockMvc.perform(post("/api/barrels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(barrelDTO)))
            .andExpect(status().isCreated());

        // Validate the Barrel in the database
        List<Barrel> barrelList = barrelRepository.findAll();
        assertThat(barrelList).hasSize(databaseSizeBeforeCreate + 1);
        Barrel testBarrel = barrelList.get(barrelList.size() - 1);
        assertThat(testBarrel.getBarreledDate()).isEqualTo(DEFAULT_BARRELED_DATE);

        // Validate the Barrel in Elasticsearch
        verify(mockBarrelSearchRepository, times(1)).save(testBarrel);
    }

    @Test
    @Transactional
    public void createBarrelWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = barrelRepository.findAll().size();

        // Create the Barrel with an existing ID
        barrel.setId(1L);
        BarrelDTO barrelDTO = barrelMapper.toDto(barrel);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBarrelMockMvc.perform(post("/api/barrels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(barrelDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Barrel in the database
        List<Barrel> barrelList = barrelRepository.findAll();
        assertThat(barrelList).hasSize(databaseSizeBeforeCreate);

        // Validate the Barrel in Elasticsearch
        verify(mockBarrelSearchRepository, times(0)).save(barrel);
    }

    @Test
    @Transactional
    public void checkBarreledDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = barrelRepository.findAll().size();
        // set the field null
        barrel.setBarreledDate(null);

        // Create the Barrel, which fails.
        BarrelDTO barrelDTO = barrelMapper.toDto(barrel);

        restBarrelMockMvc.perform(post("/api/barrels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(barrelDTO)))
            .andExpect(status().isBadRequest());

        List<Barrel> barrelList = barrelRepository.findAll();
        assertThat(barrelList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBarrels() throws Exception {
        // Initialize the database
        barrelRepository.saveAndFlush(barrel);

        // Get all the barrelList
        restBarrelMockMvc.perform(get("/api/barrels?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(barrel.getId().intValue())))
            .andExpect(jsonPath("$.[*].barreledDate").value(hasItem(sameInstant(DEFAULT_BARRELED_DATE))));
    }
    
    @Test
    @Transactional
    public void getBarrel() throws Exception {
        // Initialize the database
        barrelRepository.saveAndFlush(barrel);

        // Get the barrel
        restBarrelMockMvc.perform(get("/api/barrels/{id}", barrel.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(barrel.getId().intValue()))
            .andExpect(jsonPath("$.barreledDate").value(sameInstant(DEFAULT_BARRELED_DATE)));
    }

    @Test
    @Transactional
    public void getNonExistingBarrel() throws Exception {
        // Get the barrel
        restBarrelMockMvc.perform(get("/api/barrels/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBarrel() throws Exception {
        // Initialize the database
        barrelRepository.saveAndFlush(barrel);

        int databaseSizeBeforeUpdate = barrelRepository.findAll().size();

        // Update the barrel
        Barrel updatedBarrel = barrelRepository.findById(barrel.getId()).get();
        // Disconnect from session so that the updates on updatedBarrel are not directly saved in db
        em.detach(updatedBarrel);
        updatedBarrel
            .barreledDate(UPDATED_BARRELED_DATE);
        BarrelDTO barrelDTO = barrelMapper.toDto(updatedBarrel);

        restBarrelMockMvc.perform(put("/api/barrels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(barrelDTO)))
            .andExpect(status().isOk());

        // Validate the Barrel in the database
        List<Barrel> barrelList = barrelRepository.findAll();
        assertThat(barrelList).hasSize(databaseSizeBeforeUpdate);
        Barrel testBarrel = barrelList.get(barrelList.size() - 1);
        assertThat(testBarrel.getBarreledDate()).isEqualTo(UPDATED_BARRELED_DATE);

        // Validate the Barrel in Elasticsearch
        verify(mockBarrelSearchRepository, times(1)).save(testBarrel);
    }

    @Test
    @Transactional
    public void updateNonExistingBarrel() throws Exception {
        int databaseSizeBeforeUpdate = barrelRepository.findAll().size();

        // Create the Barrel
        BarrelDTO barrelDTO = barrelMapper.toDto(barrel);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBarrelMockMvc.perform(put("/api/barrels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(barrelDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Barrel in the database
        List<Barrel> barrelList = barrelRepository.findAll();
        assertThat(barrelList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Barrel in Elasticsearch
        verify(mockBarrelSearchRepository, times(0)).save(barrel);
    }

    @Test
    @Transactional
    public void deleteBarrel() throws Exception {
        // Initialize the database
        barrelRepository.saveAndFlush(barrel);

        int databaseSizeBeforeDelete = barrelRepository.findAll().size();

        // Delete the barrel
        restBarrelMockMvc.perform(delete("/api/barrels/{id}", barrel.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Barrel> barrelList = barrelRepository.findAll();
        assertThat(barrelList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Barrel in Elasticsearch
        verify(mockBarrelSearchRepository, times(1)).deleteById(barrel.getId());
    }

    @Test
    @Transactional
    public void searchBarrel() throws Exception {
        // Initialize the database
        barrelRepository.saveAndFlush(barrel);
        when(mockBarrelSearchRepository.search(queryStringQuery("id:" + barrel.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(barrel), PageRequest.of(0, 1), 1));
        // Search the barrel
        restBarrelMockMvc.perform(get("/api/_search/barrels?query=id:" + barrel.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(barrel.getId().intValue())))
            .andExpect(jsonPath("$.[*].barreledDate").value(hasItem(sameInstant(DEFAULT_BARRELED_DATE))));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Barrel.class);
        Barrel barrel1 = new Barrel();
        barrel1.setId(1L);
        Barrel barrel2 = new Barrel();
        barrel2.setId(barrel1.getId());
        assertThat(barrel1).isEqualTo(barrel2);
        barrel2.setId(2L);
        assertThat(barrel1).isNotEqualTo(barrel2);
        barrel1.setId(null);
        assertThat(barrel1).isNotEqualTo(barrel2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(BarrelDTO.class);
        BarrelDTO barrelDTO1 = new BarrelDTO();
        barrelDTO1.setId(1L);
        BarrelDTO barrelDTO2 = new BarrelDTO();
        assertThat(barrelDTO1).isNotEqualTo(barrelDTO2);
        barrelDTO2.setId(barrelDTO1.getId());
        assertThat(barrelDTO1).isEqualTo(barrelDTO2);
        barrelDTO2.setId(2L);
        assertThat(barrelDTO1).isNotEqualTo(barrelDTO2);
        barrelDTO1.setId(null);
        assertThat(barrelDTO1).isNotEqualTo(barrelDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(barrelMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(barrelMapper.fromId(null)).isNull();
    }
}

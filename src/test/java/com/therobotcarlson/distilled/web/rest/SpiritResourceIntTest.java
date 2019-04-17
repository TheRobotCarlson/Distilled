package com.therobotcarlson.distilled.web.rest;

import com.therobotcarlson.distilled.DistilledApp;

import com.therobotcarlson.distilled.domain.Spirit;
import com.therobotcarlson.distilled.repository.SpiritRepository;
import com.therobotcarlson.distilled.repository.search.SpiritSearchRepository;
import com.therobotcarlson.distilled.service.SpiritService;
import com.therobotcarlson.distilled.service.dto.SpiritDTO;
import com.therobotcarlson.distilled.service.mapper.SpiritMapper;
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
 * Test class for the SpiritResource REST controller.
 *
 * @see SpiritResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DistilledApp.class)
public class SpiritResourceIntTest {

    private static final String DEFAULT_CATEGORY = "AAAAAAAAAA";
    private static final String UPDATED_CATEGORY = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    @Autowired
    private SpiritRepository spiritRepository;

    @Autowired
    private SpiritMapper spiritMapper;

    @Autowired
    private SpiritService spiritService;

    /**
     * This repository is mocked in the com.therobotcarlson.distilled.repository.search test package.
     *
     * @see com.therobotcarlson.distilled.repository.search.SpiritSearchRepositoryMockConfiguration
     */
    @Autowired
    private SpiritSearchRepository mockSpiritSearchRepository;

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

    private MockMvc restSpiritMockMvc;

    private Spirit spirit;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SpiritResource spiritResource = new SpiritResource(spiritService);
        this.restSpiritMockMvc = MockMvcBuilders.standaloneSetup(spiritResource)
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
    public static Spirit createEntity(EntityManager em) {
        Spirit spirit = new Spirit()
            .category(DEFAULT_CATEGORY)
            .name(DEFAULT_NAME)
            .code(DEFAULT_CODE);
        return spirit;
    }

    @Before
    public void initTest() {
        spirit = createEntity(em);
    }

    @Test
    @Transactional
    public void createSpirit() throws Exception {
        int databaseSizeBeforeCreate = spiritRepository.findAll().size();

        // Create the Spirit
        SpiritDTO spiritDTO = spiritMapper.toDto(spirit);
        restSpiritMockMvc.perform(post("/api/spirits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(spiritDTO)))
            .andExpect(status().isCreated());

        // Validate the Spirit in the database
        List<Spirit> spiritList = spiritRepository.findAll();
        assertThat(spiritList).hasSize(databaseSizeBeforeCreate + 1);
        Spirit testSpirit = spiritList.get(spiritList.size() - 1);
        assertThat(testSpirit.getCategory()).isEqualTo(DEFAULT_CATEGORY);
        assertThat(testSpirit.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSpirit.getCode()).isEqualTo(DEFAULT_CODE);

        // Validate the Spirit in Elasticsearch
        verify(mockSpiritSearchRepository, times(1)).save(testSpirit);
    }

    @Test
    @Transactional
    public void createSpiritWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = spiritRepository.findAll().size();

        // Create the Spirit with an existing ID
        spirit.setId(1L);
        SpiritDTO spiritDTO = spiritMapper.toDto(spirit);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSpiritMockMvc.perform(post("/api/spirits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(spiritDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Spirit in the database
        List<Spirit> spiritList = spiritRepository.findAll();
        assertThat(spiritList).hasSize(databaseSizeBeforeCreate);

        // Validate the Spirit in Elasticsearch
        verify(mockSpiritSearchRepository, times(0)).save(spirit);
    }

    @Test
    @Transactional
    public void checkCategoryIsRequired() throws Exception {
        int databaseSizeBeforeTest = spiritRepository.findAll().size();
        // set the field null
        spirit.setCategory(null);

        // Create the Spirit, which fails.
        SpiritDTO spiritDTO = spiritMapper.toDto(spirit);

        restSpiritMockMvc.perform(post("/api/spirits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(spiritDTO)))
            .andExpect(status().isBadRequest());

        List<Spirit> spiritList = spiritRepository.findAll();
        assertThat(spiritList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = spiritRepository.findAll().size();
        // set the field null
        spirit.setName(null);

        // Create the Spirit, which fails.
        SpiritDTO spiritDTO = spiritMapper.toDto(spirit);

        restSpiritMockMvc.perform(post("/api/spirits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(spiritDTO)))
            .andExpect(status().isBadRequest());

        List<Spirit> spiritList = spiritRepository.findAll();
        assertThat(spiritList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = spiritRepository.findAll().size();
        // set the field null
        spirit.setCode(null);

        // Create the Spirit, which fails.
        SpiritDTO spiritDTO = spiritMapper.toDto(spirit);

        restSpiritMockMvc.perform(post("/api/spirits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(spiritDTO)))
            .andExpect(status().isBadRequest());

        List<Spirit> spiritList = spiritRepository.findAll();
        assertThat(spiritList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSpirits() throws Exception {
        // Initialize the database
        spiritRepository.saveAndFlush(spirit);

        // Get all the spiritList
        restSpiritMockMvc.perform(get("/api/spirits?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(spirit.getId().intValue())))
            .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())));
    }
    
    @Test
    @Transactional
    public void getSpirit() throws Exception {
        // Initialize the database
        spiritRepository.saveAndFlush(spirit);

        // Get the spirit
        restSpiritMockMvc.perform(get("/api/spirits/{id}", spirit.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(spirit.getId().intValue()))
            .andExpect(jsonPath("$.category").value(DEFAULT_CATEGORY.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSpirit() throws Exception {
        // Get the spirit
        restSpiritMockMvc.perform(get("/api/spirits/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSpirit() throws Exception {
        // Initialize the database
        spiritRepository.saveAndFlush(spirit);

        int databaseSizeBeforeUpdate = spiritRepository.findAll().size();

        // Update the spirit
        Spirit updatedSpirit = spiritRepository.findById(spirit.getId()).get();
        // Disconnect from session so that the updates on updatedSpirit are not directly saved in db
        em.detach(updatedSpirit);
        updatedSpirit
            .category(UPDATED_CATEGORY)
            .name(UPDATED_NAME)
            .code(UPDATED_CODE);
        SpiritDTO spiritDTO = spiritMapper.toDto(updatedSpirit);

        restSpiritMockMvc.perform(put("/api/spirits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(spiritDTO)))
            .andExpect(status().isOk());

        // Validate the Spirit in the database
        List<Spirit> spiritList = spiritRepository.findAll();
        assertThat(spiritList).hasSize(databaseSizeBeforeUpdate);
        Spirit testSpirit = spiritList.get(spiritList.size() - 1);
        assertThat(testSpirit.getCategory()).isEqualTo(UPDATED_CATEGORY);
        assertThat(testSpirit.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSpirit.getCode()).isEqualTo(UPDATED_CODE);

        // Validate the Spirit in Elasticsearch
        verify(mockSpiritSearchRepository, times(1)).save(testSpirit);
    }

    @Test
    @Transactional
    public void updateNonExistingSpirit() throws Exception {
        int databaseSizeBeforeUpdate = spiritRepository.findAll().size();

        // Create the Spirit
        SpiritDTO spiritDTO = spiritMapper.toDto(spirit);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSpiritMockMvc.perform(put("/api/spirits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(spiritDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Spirit in the database
        List<Spirit> spiritList = spiritRepository.findAll();
        assertThat(spiritList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Spirit in Elasticsearch
        verify(mockSpiritSearchRepository, times(0)).save(spirit);
    }

    @Test
    @Transactional
    public void deleteSpirit() throws Exception {
        // Initialize the database
        spiritRepository.saveAndFlush(spirit);

        int databaseSizeBeforeDelete = spiritRepository.findAll().size();

        // Delete the spirit
        restSpiritMockMvc.perform(delete("/api/spirits/{id}", spirit.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Spirit> spiritList = spiritRepository.findAll();
        assertThat(spiritList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Spirit in Elasticsearch
        verify(mockSpiritSearchRepository, times(1)).deleteById(spirit.getId());
    }

    @Test
    @Transactional
    public void searchSpirit() throws Exception {
        // Initialize the database
        spiritRepository.saveAndFlush(spirit);
        when(mockSpiritSearchRepository.search(queryStringQuery("id:" + spirit.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(spirit), PageRequest.of(0, 1), 1));
        // Search the spirit
        restSpiritMockMvc.perform(get("/api/_search/spirits?query=id:" + spirit.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(spirit.getId().intValue())))
            .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Spirit.class);
        Spirit spirit1 = new Spirit();
        spirit1.setId(1L);
        Spirit spirit2 = new Spirit();
        spirit2.setId(spirit1.getId());
        assertThat(spirit1).isEqualTo(spirit2);
        spirit2.setId(2L);
        assertThat(spirit1).isNotEqualTo(spirit2);
        spirit1.setId(null);
        assertThat(spirit1).isNotEqualTo(spirit2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SpiritDTO.class);
        SpiritDTO spiritDTO1 = new SpiritDTO();
        spiritDTO1.setId(1L);
        SpiritDTO spiritDTO2 = new SpiritDTO();
        assertThat(spiritDTO1).isNotEqualTo(spiritDTO2);
        spiritDTO2.setId(spiritDTO1.getId());
        assertThat(spiritDTO1).isEqualTo(spiritDTO2);
        spiritDTO2.setId(2L);
        assertThat(spiritDTO1).isNotEqualTo(spiritDTO2);
        spiritDTO1.setId(null);
        assertThat(spiritDTO1).isNotEqualTo(spiritDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(spiritMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(spiritMapper.fromId(null)).isNull();
    }
}

package com.therobotcarlson.distilled.service.impl;

import com.therobotcarlson.distilled.service.GrainService;
import com.therobotcarlson.distilled.domain.Grain;
import com.therobotcarlson.distilled.repository.GrainRepository;
import com.therobotcarlson.distilled.repository.search.GrainSearchRepository;
import com.therobotcarlson.distilled.service.dto.GrainDTO;
import com.therobotcarlson.distilled.service.mapper.GrainMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Grain.
 */
@Service
@Transactional
public class GrainServiceImpl implements GrainService {

    private final Logger log = LoggerFactory.getLogger(GrainServiceImpl.class);

    private final GrainRepository grainRepository;

    private final GrainMapper grainMapper;

    private final GrainSearchRepository grainSearchRepository;

    public GrainServiceImpl(GrainRepository grainRepository, GrainMapper grainMapper, GrainSearchRepository grainSearchRepository) {
        this.grainRepository = grainRepository;
        this.grainMapper = grainMapper;
        this.grainSearchRepository = grainSearchRepository;
    }

    /**
     * Save a grain.
     *
     * @param grainDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public GrainDTO save(GrainDTO grainDTO) {
        log.debug("Request to save Grain : {}", grainDTO);
        Grain grain = grainMapper.toEntity(grainDTO);
        grain = grainRepository.save(grain);
        GrainDTO result = grainMapper.toDto(grain);
        grainSearchRepository.save(grain);
        return result;
    }

    /**
     * Get all the grains.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<GrainDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Grains");
        return grainRepository.findAll(pageable)
            .map(grainMapper::toDto);
    }


    /**
     * Get one grain by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<GrainDTO> findOne(Long id) {
        log.debug("Request to get Grain : {}", id);
        return grainRepository.findById(id)
            .map(grainMapper::toDto);
    }

    /**
     * Delete the grain by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Grain : {}", id);
        grainRepository.deleteById(id);
        grainSearchRepository.deleteById(id);
    }

    /**
     * Search for the grain corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<GrainDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Grains for query {}", query);
        return grainSearchRepository.search(queryStringQuery(query), pageable)
            .map(grainMapper::toDto);
    }
}

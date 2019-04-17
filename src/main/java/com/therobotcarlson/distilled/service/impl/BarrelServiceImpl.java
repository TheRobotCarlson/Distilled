package com.therobotcarlson.distilled.service.impl;

import com.therobotcarlson.distilled.service.BarrelService;
import com.therobotcarlson.distilled.domain.Barrel;
import com.therobotcarlson.distilled.repository.BarrelRepository;
import com.therobotcarlson.distilled.repository.search.BarrelSearchRepository;
import com.therobotcarlson.distilled.service.dto.BarrelDTO;
import com.therobotcarlson.distilled.service.mapper.BarrelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Barrel.
 */
@Service
@Transactional
public class BarrelServiceImpl implements BarrelService {

    private final Logger log = LoggerFactory.getLogger(BarrelServiceImpl.class);

    private final BarrelRepository barrelRepository;

    private final BarrelMapper barrelMapper;

    private final BarrelSearchRepository barrelSearchRepository;

    public BarrelServiceImpl(BarrelRepository barrelRepository, BarrelMapper barrelMapper, BarrelSearchRepository barrelSearchRepository) {
        this.barrelRepository = barrelRepository;
        this.barrelMapper = barrelMapper;
        this.barrelSearchRepository = barrelSearchRepository;
    }

    /**
     * Save a barrel.
     *
     * @param barrelDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public BarrelDTO save(BarrelDTO barrelDTO) {
        log.debug("Request to save Barrel : {}", barrelDTO);
        Barrel barrel = barrelMapper.toEntity(barrelDTO);
        barrel = barrelRepository.save(barrel);
        BarrelDTO result = barrelMapper.toDto(barrel);
        barrelSearchRepository.save(barrel);
        return result;
    }

    /**
     * Get all the barrels.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<BarrelDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Barrels");
        return barrelRepository.findAll(pageable)
            .map(barrelMapper::toDto);
    }


    /**
     * Get one barrel by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<BarrelDTO> findOne(Long id) {
        log.debug("Request to get Barrel : {}", id);
        return barrelRepository.findById(id)
            .map(barrelMapper::toDto);
    }

    /**
     * Delete the barrel by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Barrel : {}", id);
        barrelRepository.deleteById(id);
        barrelSearchRepository.deleteById(id);
    }

    /**
     * Search for the barrel corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<BarrelDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Barrels for query {}", query);
        return barrelSearchRepository.search(queryStringQuery(query), pageable)
            .map(barrelMapper::toDto);
    }
}

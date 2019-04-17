package com.therobotcarlson.distilled.service.impl;

import com.therobotcarlson.distilled.service.MashbillGrainService;
import com.therobotcarlson.distilled.domain.MashbillGrain;
import com.therobotcarlson.distilled.repository.MashbillGrainRepository;
import com.therobotcarlson.distilled.repository.search.MashbillGrainSearchRepository;
import com.therobotcarlson.distilled.service.dto.MashbillGrainDTO;
import com.therobotcarlson.distilled.service.mapper.MashbillGrainMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing MashbillGrain.
 */
@Service
@Transactional
public class MashbillGrainServiceImpl implements MashbillGrainService {

    private final Logger log = LoggerFactory.getLogger(MashbillGrainServiceImpl.class);

    private final MashbillGrainRepository mashbillGrainRepository;

    private final MashbillGrainMapper mashbillGrainMapper;

    private final MashbillGrainSearchRepository mashbillGrainSearchRepository;

    public MashbillGrainServiceImpl(MashbillGrainRepository mashbillGrainRepository, MashbillGrainMapper mashbillGrainMapper, MashbillGrainSearchRepository mashbillGrainSearchRepository) {
        this.mashbillGrainRepository = mashbillGrainRepository;
        this.mashbillGrainMapper = mashbillGrainMapper;
        this.mashbillGrainSearchRepository = mashbillGrainSearchRepository;
    }

    /**
     * Save a mashbillGrain.
     *
     * @param mashbillGrainDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public MashbillGrainDTO save(MashbillGrainDTO mashbillGrainDTO) {
        log.debug("Request to save MashbillGrain : {}", mashbillGrainDTO);
        MashbillGrain mashbillGrain = mashbillGrainMapper.toEntity(mashbillGrainDTO);
        mashbillGrain = mashbillGrainRepository.save(mashbillGrain);
        MashbillGrainDTO result = mashbillGrainMapper.toDto(mashbillGrain);
        mashbillGrainSearchRepository.save(mashbillGrain);
        return result;
    }

    /**
     * Get all the mashbillGrains.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<MashbillGrainDTO> findAll() {
        log.debug("Request to get all MashbillGrains");
        return mashbillGrainRepository.findAll().stream()
            .map(mashbillGrainMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one mashbillGrain by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<MashbillGrainDTO> findOne(Long id) {
        log.debug("Request to get MashbillGrain : {}", id);
        return mashbillGrainRepository.findById(id)
            .map(mashbillGrainMapper::toDto);
    }

    /**
     * Delete the mashbillGrain by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete MashbillGrain : {}", id);
        mashbillGrainRepository.deleteById(id);
        mashbillGrainSearchRepository.deleteById(id);
    }

    /**
     * Search for the mashbillGrain corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<MashbillGrainDTO> search(String query) {
        log.debug("Request to search MashbillGrains for query {}", query);
        return StreamSupport
            .stream(mashbillGrainSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(mashbillGrainMapper::toDto)
            .collect(Collectors.toList());
    }
}

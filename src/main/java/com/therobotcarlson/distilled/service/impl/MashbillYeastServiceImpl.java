package com.therobotcarlson.distilled.service.impl;

import com.therobotcarlson.distilled.service.MashbillYeastService;
import com.therobotcarlson.distilled.domain.MashbillYeast;
import com.therobotcarlson.distilled.repository.MashbillYeastRepository;
import com.therobotcarlson.distilled.repository.search.MashbillYeastSearchRepository;
import com.therobotcarlson.distilled.service.dto.MashbillYeastDTO;
import com.therobotcarlson.distilled.service.mapper.MashbillYeastMapper;
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
 * Service Implementation for managing MashbillYeast.
 */
@Service
@Transactional
public class MashbillYeastServiceImpl implements MashbillYeastService {

    private final Logger log = LoggerFactory.getLogger(MashbillYeastServiceImpl.class);

    private final MashbillYeastRepository mashbillYeastRepository;

    private final MashbillYeastMapper mashbillYeastMapper;

    private final MashbillYeastSearchRepository mashbillYeastSearchRepository;

    public MashbillYeastServiceImpl(MashbillYeastRepository mashbillYeastRepository, MashbillYeastMapper mashbillYeastMapper, MashbillYeastSearchRepository mashbillYeastSearchRepository) {
        this.mashbillYeastRepository = mashbillYeastRepository;
        this.mashbillYeastMapper = mashbillYeastMapper;
        this.mashbillYeastSearchRepository = mashbillYeastSearchRepository;
    }

    /**
     * Save a mashbillYeast.
     *
     * @param mashbillYeastDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public MashbillYeastDTO save(MashbillYeastDTO mashbillYeastDTO) {
        log.debug("Request to save MashbillYeast : {}", mashbillYeastDTO);
        MashbillYeast mashbillYeast = mashbillYeastMapper.toEntity(mashbillYeastDTO);
        mashbillYeast = mashbillYeastRepository.save(mashbillYeast);
        MashbillYeastDTO result = mashbillYeastMapper.toDto(mashbillYeast);
        mashbillYeastSearchRepository.save(mashbillYeast);
        return result;
    }

    /**
     * Get all the mashbillYeasts.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<MashbillYeastDTO> findAll() {
        log.debug("Request to get all MashbillYeasts");
        return mashbillYeastRepository.findAll().stream()
            .map(mashbillYeastMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }



    /**
     *  get all the mashbillYeasts where Mashbill is null.
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<MashbillYeastDTO> findAllWhereMashbillIsNull() {
        log.debug("Request to get all mashbillYeasts where Mashbill is null");
        return StreamSupport
            .stream(mashbillYeastRepository.findAll().spliterator(), false)
            .filter(mashbillYeast -> mashbillYeast.getMashbill() == null)
            .map(mashbillYeastMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one mashbillYeast by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<MashbillYeastDTO> findOne(Long id) {
        log.debug("Request to get MashbillYeast : {}", id);
        return mashbillYeastRepository.findById(id)
            .map(mashbillYeastMapper::toDto);
    }

    /**
     * Delete the mashbillYeast by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete MashbillYeast : {}", id);        mashbillYeastRepository.deleteById(id);
        mashbillYeastSearchRepository.deleteById(id);
    }

    /**
     * Search for the mashbillYeast corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<MashbillYeastDTO> search(String query) {
        log.debug("Request to search MashbillYeasts for query {}", query);
        return StreamSupport
            .stream(mashbillYeastSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(mashbillYeastMapper::toDto)
            .collect(Collectors.toList());
    }
}

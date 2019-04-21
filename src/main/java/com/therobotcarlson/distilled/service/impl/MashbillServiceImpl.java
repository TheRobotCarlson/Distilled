package com.therobotcarlson.distilled.service.impl;

import com.therobotcarlson.distilled.service.MashbillService;
import com.therobotcarlson.distilled.domain.Mashbill;
import com.therobotcarlson.distilled.repository.MashbillGrainRepository;
import com.therobotcarlson.distilled.repository.MashbillRepository;
import com.therobotcarlson.distilled.repository.search.MashbillGrainSearchRepository;
import com.therobotcarlson.distilled.repository.search.MashbillSearchRepository;
import com.therobotcarlson.distilled.service.dto.MashbillDTO;
import com.therobotcarlson.distilled.service.dto.MashbillGrainDTO;
import com.therobotcarlson.distilled.service.mapper.MashbillGrainMapper;
import com.therobotcarlson.distilled.service.mapper.MashbillMapper;

import com.therobotcarlson.distilled.domain.MashbillGrain;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.Set;
import java.util.HashSet;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Mashbill.
 */
@Service
@Transactional
public class MashbillServiceImpl implements MashbillService {

    private final Logger log = LoggerFactory.getLogger(MashbillServiceImpl.class);

    private final MashbillRepository mashbillRepository;

    private final MashbillMapper mashbillMapper;

    private final MashbillGrainMapper mashbillGrainMapper;

    private final MashbillSearchRepository mashbillSearchRepository;

    private final MashbillGrainSearchRepository mashbillGrainSearchRepository;

    private final MashbillGrainRepository mashbillGrainRepository;



    public MashbillServiceImpl(MashbillRepository mashbillRepository, MashbillMapper mashbillMapper, MashbillSearchRepository mashbillSearchRepository, MashbillGrainMapper mashbillGrainMapper, MashbillGrainSearchRepository mbgsr,MashbillGrainRepository mbgr) {
        this.mashbillRepository = mashbillRepository;
        this.mashbillMapper = mashbillMapper;
        this.mashbillSearchRepository = mashbillSearchRepository;
        this.mashbillGrainMapper = mashbillGrainMapper;
        this.mashbillGrainSearchRepository = mbgsr;
        this.mashbillGrainRepository = mbgr;
    }

    /**
     * Save a mashbill.
     *
     * @param mashbillDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public MashbillDTO save(MashbillDTO mashbillDTO) {
        log.debug("Request to save Mashbill : {}", mashbillDTO);
        Mashbill mashbill = mashbillMapper.toEntity(mashbillDTO);
        Set<MashbillGrain> mbgrains = mashbill.getGrainCounts();
        log.debug("Mashbill Grains: {}", mbgrains);
        Set<MashbillGrain> actualGrains = new HashSet<MashbillGrain>();
        for(MashbillGrain g: mbgrains){
            MashbillGrainDTO dto = this.mashbillGrainMapper.toDto(g);
            MashbillGrain mbg = mashbillGrainRepository.save(g);
            mashbillGrainSearchRepository.save(mbg);
            actualGrains.add(mbg);
        }
        mashbill.grainCounts(actualGrains);
        
        mashbill = mashbillRepository.save(mashbill);
        MashbillDTO result = mashbillMapper.toDto(mashbill);
        mashbillSearchRepository.save(mashbill);
        return result;
    }

    /**
     * Get all the mashbills.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<MashbillDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Mashbills");
        return mashbillRepository.findAll(pageable)
            .map(mashbillMapper::toDto);
    }

    /**
     * Get all the Mashbill with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    public Page<MashbillDTO> findAllWithEagerRelationships(Pageable pageable) {
        return mashbillRepository.findAllWithEagerRelationships(pageable).map(mashbillMapper::toDto);
    }
    

    /**
     * Get one mashbill by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<MashbillDTO> findOne(Long id) {
        log.debug("Request to get Mashbill : {}", id);
        return mashbillRepository.findOneWithEagerRelationships(id)
            .map(mashbillMapper::toDto);
    }

    /**
     * Delete the mashbill by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Mashbill : {}", id);
        mashbillRepository.deleteById(id);
        mashbillSearchRepository.deleteById(id);
    }

    /**
     * Search for the mashbill corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<MashbillDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Mashbills for query {}", query);
        return mashbillSearchRepository.search(queryStringQuery(query), pageable)
            .map(mashbillMapper::toDto);
    }
}

package com.therobotcarlson.distilled.service.impl;

import com.therobotcarlson.distilled.service.SpiritService;
import com.therobotcarlson.distilled.domain.Spirit;
import com.therobotcarlson.distilled.repository.SpiritRepository;
import com.therobotcarlson.distilled.repository.search.SpiritSearchRepository;
import com.therobotcarlson.distilled.service.dto.SpiritDTO;
import com.therobotcarlson.distilled.service.mapper.SpiritMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Spirit.
 */
@Service
@Transactional
public class SpiritServiceImpl implements SpiritService {

    private final Logger log = LoggerFactory.getLogger(SpiritServiceImpl.class);

    private final SpiritRepository spiritRepository;

    private final SpiritMapper spiritMapper;

    private final SpiritSearchRepository spiritSearchRepository;

    public SpiritServiceImpl(SpiritRepository spiritRepository, SpiritMapper spiritMapper, SpiritSearchRepository spiritSearchRepository) {
        this.spiritRepository = spiritRepository;
        this.spiritMapper = spiritMapper;
        this.spiritSearchRepository = spiritSearchRepository;
    }

    /**
     * Save a spirit.
     *
     * @param spiritDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public SpiritDTO save(SpiritDTO spiritDTO) {
        log.debug("Request to save Spirit : {}", spiritDTO);
        Spirit spirit = spiritMapper.toEntity(spiritDTO);
        spirit = spiritRepository.save(spirit);
        SpiritDTO result = spiritMapper.toDto(spirit);
        spiritSearchRepository.save(spirit);
        return result;
    }

    /**
     * Get all the spirits.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<SpiritDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Spirits");
        return spiritRepository.findAll(pageable)
            .map(spiritMapper::toDto);
    }


    /**
     * Get one spirit by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<SpiritDTO> findOne(Long id) {
        log.debug("Request to get Spirit : {}", id);
        return spiritRepository.findById(id)
            .map(spiritMapper::toDto);
    }

    /**
     * Delete the spirit by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Spirit : {}", id);        spiritRepository.deleteById(id);
        spiritSearchRepository.deleteById(id);
    }

    /**
     * Search for the spirit corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<SpiritDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Spirits for query {}", query);
        return spiritSearchRepository.search(queryStringQuery(query), pageable)
            .map(spiritMapper::toDto);
    }
}

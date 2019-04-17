package com.therobotcarlson.distilled.service.impl;

import com.therobotcarlson.distilled.service.YeastService;
import com.therobotcarlson.distilled.domain.Yeast;
import com.therobotcarlson.distilled.repository.YeastRepository;
import com.therobotcarlson.distilled.repository.search.YeastSearchRepository;
import com.therobotcarlson.distilled.service.dto.YeastDTO;
import com.therobotcarlson.distilled.service.mapper.YeastMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Yeast.
 */
@Service
@Transactional
public class YeastServiceImpl implements YeastService {

    private final Logger log = LoggerFactory.getLogger(YeastServiceImpl.class);

    private final YeastRepository yeastRepository;

    private final YeastMapper yeastMapper;

    private final YeastSearchRepository yeastSearchRepository;

    public YeastServiceImpl(YeastRepository yeastRepository, YeastMapper yeastMapper, YeastSearchRepository yeastSearchRepository) {
        this.yeastRepository = yeastRepository;
        this.yeastMapper = yeastMapper;
        this.yeastSearchRepository = yeastSearchRepository;
    }

    /**
     * Save a yeast.
     *
     * @param yeastDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public YeastDTO save(YeastDTO yeastDTO) {
        log.debug("Request to save Yeast : {}", yeastDTO);
        Yeast yeast = yeastMapper.toEntity(yeastDTO);
        yeast = yeastRepository.save(yeast);
        YeastDTO result = yeastMapper.toDto(yeast);
        yeastSearchRepository.save(yeast);
        return result;
    }

    /**
     * Get all the yeasts.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<YeastDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Yeasts");
        return yeastRepository.findAll(pageable)
            .map(yeastMapper::toDto);
    }


    /**
     * Get one yeast by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<YeastDTO> findOne(Long id) {
        log.debug("Request to get Yeast : {}", id);
        return yeastRepository.findById(id)
            .map(yeastMapper::toDto);
    }

    /**
     * Delete the yeast by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Yeast : {}", id);
        yeastRepository.deleteById(id);
        yeastSearchRepository.deleteById(id);
    }

    /**
     * Search for the yeast corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<YeastDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Yeasts for query {}", query);
        return yeastSearchRepository.search(queryStringQuery(query), pageable)
            .map(yeastMapper::toDto);
    }
}

package com.therobotcarlson.distilled.service.impl;

import com.therobotcarlson.distilled.repository.BarrelRepository;
import com.therobotcarlson.distilled.service.BatchService;
import com.therobotcarlson.distilled.domain.Batch;
import com.therobotcarlson.distilled.repository.BatchRepository;
import com.therobotcarlson.distilled.repository.search.BatchSearchRepository;
import com.therobotcarlson.distilled.service.dto.BatchDTO;
import com.therobotcarlson.distilled.service.mapper.BatchMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Batch.
 */
@Service
@Transactional
public class BatchServiceImpl implements BatchService {

    private final Logger log = LoggerFactory.getLogger(BatchServiceImpl.class);

    private final BatchRepository batchRepository;

    private final BatchMapper batchMapper;

    private final BatchSearchRepository batchSearchRepository;

    private final BarrelRepository barrelRepository;

    public BatchServiceImpl(BatchRepository batchRepository, BatchMapper batchMapper, BatchSearchRepository batchSearchRepository, BarrelRepository barrelRepository) {
        this.batchRepository = batchRepository;
        this.batchMapper = batchMapper;
        this.batchSearchRepository = batchSearchRepository;
        this.barrelRepository = barrelRepository;
    }

    /**
     * Save a batch.
     *
     * @param batchDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public BatchDTO save(BatchDTO batchDTO) {
        log.debug("Request to save Batch : {}", batchDTO);
        Batch batch = batchMapper.toEntity(batchDTO);
        batch = batchRepository.save(batch);
        BatchDTO result = batchMapper.toDto(batch);
        batchSearchRepository.save(batch);
        return result;
    }

    /**
     * Get all the batches.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<BatchDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Batches");
        return batchRepository.findAll(pageable)
            .map(batchMapper::toDto);
    }


    /**
     * Get one batch by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<BatchDTO> findOne(Long id) {
        log.debug("Request to get Batch : {}", id);
        return batchRepository.findById(id)
            .map(batchMapper::toDto);
    }

    /**
     * Delete the batch by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Batch : {}", id);
        batchRepository.deleteById(id);
        batchSearchRepository.deleteById(id);
    }

    /**
     * Search for the batch corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<BatchDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Batches for query {}", query);
        return batchSearchRepository.search(queryStringQuery(query), pageable)
            .map(batchMapper::toDto);
    }

    /**
     * Get the barrel count per batch.
     *
     * @param id the batch information
     * @return the count of barrels
     */
    @Override
    public long countBarrelsByBatch(Long id) {
        Optional<Batch> batch = batchRepository.findById(id);

        if(batch.isPresent()){
            return barrelRepository.countBarrelsByBatch(batch.get());
        } else {
            return 0;
        }
    }
}

package com.therobotcarlson.distilled.service;

import com.therobotcarlson.distilled.service.dto.BatchDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Batch.
 */
public interface BatchService {

    /**
     * Save a batch.
     *
     * @param batchDTO the entity to save
     * @return the persisted entity
     */
    BatchDTO save(BatchDTO batchDTO);

    /**
     * Get all the batches.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<BatchDTO> findAll(Pageable pageable);


    /**
     * Get the "id" batch.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<BatchDTO> findOne(Long id);

    /**
     * Delete the "id" batch.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the batch corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<BatchDTO> search(String query, Pageable pageable);
}

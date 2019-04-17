package com.therobotcarlson.distilled.service;

import com.therobotcarlson.distilled.service.dto.GrainDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Grain.
 */
public interface GrainService {

    /**
     * Save a grain.
     *
     * @param grainDTO the entity to save
     * @return the persisted entity
     */
    GrainDTO save(GrainDTO grainDTO);

    /**
     * Get all the grains.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<GrainDTO> findAll(Pageable pageable);


    /**
     * Get the "id" grain.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<GrainDTO> findOne(Long id);

    /**
     * Delete the "id" grain.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the grain corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<GrainDTO> search(String query, Pageable pageable);
}

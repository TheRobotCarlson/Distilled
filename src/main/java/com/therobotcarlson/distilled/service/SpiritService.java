package com.therobotcarlson.distilled.service;

import com.therobotcarlson.distilled.service.dto.SpiritDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Spirit.
 */
public interface SpiritService {

    /**
     * Save a spirit.
     *
     * @param spiritDTO the entity to save
     * @return the persisted entity
     */
    SpiritDTO save(SpiritDTO spiritDTO);

    /**
     * Get all the spirits.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<SpiritDTO> findAll(Pageable pageable);


    /**
     * Get the "id" spirit.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<SpiritDTO> findOne(Long id);

    /**
     * Delete the "id" spirit.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the spirit corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<SpiritDTO> search(String query, Pageable pageable);
}

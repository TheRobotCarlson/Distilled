package com.therobotcarlson.distilled.service;

import com.therobotcarlson.distilled.service.dto.BarrelDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Barrel.
 */
public interface BarrelService {

    /**
     * Save a barrel.
     *
     * @param barrelDTO the entity to save
     * @return the persisted entity
     */
    BarrelDTO save(BarrelDTO barrelDTO);

    /**
     * Get all the barrels.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<BarrelDTO> findAll(Pageable pageable);


    /**
     * Get the "id" barrel.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<BarrelDTO> findOne(Long id);

    /**
     * Delete the "id" barrel.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the barrel corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<BarrelDTO> search(String query, Pageable pageable);
}

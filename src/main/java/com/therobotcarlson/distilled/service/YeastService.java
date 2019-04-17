package com.therobotcarlson.distilled.service;

import com.therobotcarlson.distilled.service.dto.YeastDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Yeast.
 */
public interface YeastService {

    /**
     * Save a yeast.
     *
     * @param yeastDTO the entity to save
     * @return the persisted entity
     */
    YeastDTO save(YeastDTO yeastDTO);

    /**
     * Get all the yeasts.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<YeastDTO> findAll(Pageable pageable);


    /**
     * Get the "id" yeast.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<YeastDTO> findOne(Long id);

    /**
     * Delete the "id" yeast.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the yeast corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<YeastDTO> search(String query, Pageable pageable);
}

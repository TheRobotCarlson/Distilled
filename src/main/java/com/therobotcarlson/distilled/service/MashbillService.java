package com.therobotcarlson.distilled.service;

import com.therobotcarlson.distilled.service.dto.MashbillDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Mashbill.
 */
public interface MashbillService {

    /**
     * Save a mashbill.
     *
     * @param mashbillDTO the entity to save
     * @return the persisted entity
     */
    MashbillDTO save(MashbillDTO mashbillDTO);

    /**
     * Get all the mashbills.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<MashbillDTO> findAll(Pageable pageable);

    /**
     * Get all the Mashbill with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    Page<MashbillDTO> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" mashbill.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<MashbillDTO> findOne(Long id);

    /**
     * Delete the "id" mashbill.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the mashbill corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<MashbillDTO> search(String query, Pageable pageable);
}

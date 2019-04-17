package com.therobotcarlson.distilled.service;

import com.therobotcarlson.distilled.service.dto.MashbillYeastDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing MashbillYeast.
 */
public interface MashbillYeastService {

    /**
     * Save a mashbillYeast.
     *
     * @param mashbillYeastDTO the entity to save
     * @return the persisted entity
     */
    MashbillYeastDTO save(MashbillYeastDTO mashbillYeastDTO);

    /**
     * Get all the mashbillYeasts.
     *
     * @return the list of entities
     */
    List<MashbillYeastDTO> findAll();
    /**
     * Get all the MashbillYeastDTO where Mashbill is null.
     *
     * @return the list of entities
     */
    List<MashbillYeastDTO> findAllWhereMashbillIsNull();


    /**
     * Get the "id" mashbillYeast.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<MashbillYeastDTO> findOne(Long id);

    /**
     * Delete the "id" mashbillYeast.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the mashbillYeast corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<MashbillYeastDTO> search(String query);
}

package com.therobotcarlson.distilled.service;

import com.therobotcarlson.distilled.service.dto.MashbillGrainDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing MashbillGrain.
 */
public interface MashbillGrainService {

    /**
     * Save a mashbillGrain.
     *
     * @param mashbillGrainDTO the entity to save
     * @return the persisted entity
     */
    MashbillGrainDTO save(MashbillGrainDTO mashbillGrainDTO);

    /**
     * Get all the mashbillGrains.
     *
     * @return the list of entities
     */
    List<MashbillGrainDTO> findAll();



    /**
     * Get the "id" mashbillGrain.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<MashbillGrainDTO> findOne(Long id);

    /**
     * Get the all the mashbillGrains for mashbill "id"
     *
     * @param id the id of the entity
     * @return the entity
     */
    List<MashbillGrainDTO> findGrainsByMashbillId(Long id);


    /**
     * Delete the "id" mashbillGrain.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the mashbillGrain corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<MashbillGrainDTO> search(String query);
}

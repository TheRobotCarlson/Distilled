package com.therobotcarlson.distilled.service;

import com.therobotcarlson.distilled.service.dto.WarehouseDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Warehouse.
 */
public interface WarehouseService {

    /**
     * Save a warehouse.
     *
     * @param warehouseDTO the entity to save
     * @return the persisted entity
     */
    WarehouseDTO save(WarehouseDTO warehouseDTO);

    /**
     * Get all the warehouses.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<WarehouseDTO> findAll(Pageable pageable);


    /**
     * Get the "id" warehouse.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<WarehouseDTO> findOne(Long id);

    /**
     * Delete the "id" warehouse.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the warehouse corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<WarehouseDTO> search(String query, Pageable pageable);
}

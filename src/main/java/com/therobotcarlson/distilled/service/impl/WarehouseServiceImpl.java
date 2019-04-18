package com.therobotcarlson.distilled.service.impl;

import com.therobotcarlson.distilled.service.WarehouseService;
import com.therobotcarlson.distilled.domain.Warehouse;
import com.therobotcarlson.distilled.repository.WarehouseRepository;
import com.therobotcarlson.distilled.repository.search.WarehouseSearchRepository;
import com.therobotcarlson.distilled.service.dto.WarehouseDTO;
import com.therobotcarlson.distilled.service.mapper.WarehouseMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Warehouse.
 */
@Service
@Transactional
public class WarehouseServiceImpl implements WarehouseService {

    private final Logger log = LoggerFactory.getLogger(WarehouseServiceImpl.class);

    private final WarehouseRepository warehouseRepository;

    private final WarehouseMapper warehouseMapper;

    private final WarehouseSearchRepository warehouseSearchRepository;

    public WarehouseServiceImpl(WarehouseRepository warehouseRepository, WarehouseMapper warehouseMapper, WarehouseSearchRepository warehouseSearchRepository) {
        this.warehouseRepository = warehouseRepository;
        this.warehouseMapper = warehouseMapper;
        this.warehouseSearchRepository = warehouseSearchRepository;
    }

    /**
     * Save a warehouse.
     *
     * @param warehouseDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public WarehouseDTO save(WarehouseDTO warehouseDTO) {
        log.debug("Request to save Warehouse : {}", warehouseDTO);
        Warehouse warehouse = warehouseMapper.toEntity(warehouseDTO);
        warehouse = warehouseRepository.save(warehouse);
        WarehouseDTO result = warehouseMapper.toDto(warehouse);
        warehouseSearchRepository.save(warehouse);
        return result;
    }

    /**
     * Get all the warehouses.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<WarehouseDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Warehouses");
        return warehouseRepository.findAll(pageable)
            .map(warehouseMapper::toDto);
    }


    /**
     * Get one warehouse by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<WarehouseDTO> findOne(Long id) {
        log.debug("Request to get Warehouse : {}", id);
        return warehouseRepository.findById(id)
            .map(warehouseMapper::toDto);
    }

    /**
     * Delete the warehouse by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Warehouse : {}", id);        warehouseRepository.deleteById(id);
        warehouseSearchRepository.deleteById(id);
    }

    /**
     * Search for the warehouse corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<WarehouseDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Warehouses for query {}", query);
        return warehouseSearchRepository.search(queryStringQuery(query), pageable)
            .map(warehouseMapper::toDto);
    }
}

package com.therobotcarlson.distilled.web.rest;
import com.therobotcarlson.distilled.domain.ProductionSchedule;
import com.therobotcarlson.distilled.repository.ProductionScheduleRepository;
import com.therobotcarlson.distilled.repository.search.ProductionScheduleSearchRepository;
import com.therobotcarlson.distilled.web.rest.errors.BadRequestAlertException;
import com.therobotcarlson.distilled.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing ProductionSchedule.
 */
@RestController
@RequestMapping("/api")
public class ProductionScheduleResource {

    private final Logger log = LoggerFactory.getLogger(ProductionScheduleResource.class);

    private static final String ENTITY_NAME = "productionSchedule";

    private final ProductionScheduleRepository productionScheduleRepository;

    private final ProductionScheduleSearchRepository productionScheduleSearchRepository;

    public ProductionScheduleResource(ProductionScheduleRepository productionScheduleRepository, ProductionScheduleSearchRepository productionScheduleSearchRepository) {
        this.productionScheduleRepository = productionScheduleRepository;
        this.productionScheduleSearchRepository = productionScheduleSearchRepository;
    }

    /**
     * POST  /production-schedules : Create a new productionSchedule.
     *
     * @param productionSchedule the productionSchedule to create
     * @return the ResponseEntity with status 201 (Created) and with body the new productionSchedule, or with status 400 (Bad Request) if the productionSchedule has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/production-schedules")
    public ResponseEntity<ProductionSchedule> createProductionSchedule(@RequestBody ProductionSchedule productionSchedule) throws URISyntaxException {
        log.debug("REST request to save ProductionSchedule : {}", productionSchedule);
        if (productionSchedule.getId() != null) {
            throw new BadRequestAlertException("A new productionSchedule cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProductionSchedule result = productionScheduleRepository.save(productionSchedule);
        productionScheduleSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/production-schedules/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /production-schedules : Updates an existing productionSchedule.
     *
     * @param productionSchedule the productionSchedule to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated productionSchedule,
     * or with status 400 (Bad Request) if the productionSchedule is not valid,
     * or with status 500 (Internal Server Error) if the productionSchedule couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/production-schedules")
    public ResponseEntity<ProductionSchedule> updateProductionSchedule(@RequestBody ProductionSchedule productionSchedule) throws URISyntaxException {
        log.debug("REST request to update ProductionSchedule : {}", productionSchedule);
        if (productionSchedule.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProductionSchedule result = productionScheduleRepository.save(productionSchedule);
        productionScheduleSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, productionSchedule.getId().toString()))
            .body(result);
    }

    /**
     * GET  /production-schedules : get all the productionSchedules.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of productionSchedules in body
     */
    @GetMapping("/production-schedules")
    public List<ProductionSchedule> getAllProductionSchedules() {
        log.debug("REST request to get all ProductionSchedules");
        return productionScheduleRepository.findAll();
    }

    /**
     * GET  /production-schedules/:id : get the "id" productionSchedule.
     *
     * @param id the id of the productionSchedule to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the productionSchedule, or with status 404 (Not Found)
     */
    @GetMapping("/production-schedules/{id}")
    public ResponseEntity<ProductionSchedule> getProductionSchedule(@PathVariable Long id) {
        log.debug("REST request to get ProductionSchedule : {}", id);
        Optional<ProductionSchedule> productionSchedule = productionScheduleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(productionSchedule);
    }

    /**
     * DELETE  /production-schedules/:id : delete the "id" productionSchedule.
     *
     * @param id the id of the productionSchedule to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/production-schedules/{id}")
    public ResponseEntity<Void> deleteProductionSchedule(@PathVariable Long id) {
        log.debug("REST request to delete ProductionSchedule : {}", id);
        productionScheduleRepository.deleteById(id);
        productionScheduleSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/production-schedules?query=:query : search for the productionSchedule corresponding
     * to the query.
     *
     * @param query the query of the productionSchedule search
     * @return the result of the search
     */
    @GetMapping("/_search/production-schedules")
    public List<ProductionSchedule> searchProductionSchedules(@RequestParam String query) {
        log.debug("REST request to search ProductionSchedules for query {}", query);
        return StreamSupport
            .stream(productionScheduleSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}

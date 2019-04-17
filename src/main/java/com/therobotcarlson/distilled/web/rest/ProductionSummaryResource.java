package com.therobotcarlson.distilled.web.rest;
import com.therobotcarlson.distilled.domain.ProductionSummary;
import com.therobotcarlson.distilled.repository.ProductionSummaryRepository;
import com.therobotcarlson.distilled.repository.search.ProductionSummarySearchRepository;
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
 * REST controller for managing ProductionSummary.
 */
@RestController
@RequestMapping("/api")
public class ProductionSummaryResource {

    private final Logger log = LoggerFactory.getLogger(ProductionSummaryResource.class);

    private static final String ENTITY_NAME = "productionSummary";

    private final ProductionSummaryRepository productionSummaryRepository;

    private final ProductionSummarySearchRepository productionSummarySearchRepository;

    public ProductionSummaryResource(ProductionSummaryRepository productionSummaryRepository, ProductionSummarySearchRepository productionSummarySearchRepository) {
        this.productionSummaryRepository = productionSummaryRepository;
        this.productionSummarySearchRepository = productionSummarySearchRepository;
    }

    /**
     * POST  /production-summaries : Create a new productionSummary.
     *
     * @param productionSummary the productionSummary to create
     * @return the ResponseEntity with status 201 (Created) and with body the new productionSummary, or with status 400 (Bad Request) if the productionSummary has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/production-summaries")
    public ResponseEntity<ProductionSummary> createProductionSummary(@RequestBody ProductionSummary productionSummary) throws URISyntaxException {
        log.debug("REST request to save ProductionSummary : {}", productionSummary);
        if (productionSummary.getId() != null) {
            throw new BadRequestAlertException("A new productionSummary cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProductionSummary result = productionSummaryRepository.save(productionSummary);
        productionSummarySearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/production-summaries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /production-summaries : Updates an existing productionSummary.
     *
     * @param productionSummary the productionSummary to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated productionSummary,
     * or with status 400 (Bad Request) if the productionSummary is not valid,
     * or with status 500 (Internal Server Error) if the productionSummary couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/production-summaries")
    public ResponseEntity<ProductionSummary> updateProductionSummary(@RequestBody ProductionSummary productionSummary) throws URISyntaxException {
        log.debug("REST request to update ProductionSummary : {}", productionSummary);
        if (productionSummary.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProductionSummary result = productionSummaryRepository.save(productionSummary);
        productionSummarySearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, productionSummary.getId().toString()))
            .body(result);
    }

    /**
     * GET  /production-summaries : get all the productionSummaries.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of productionSummaries in body
     */
    @GetMapping("/production-summaries")
    public List<ProductionSummary> getAllProductionSummaries() {
        log.debug("REST request to get all ProductionSummaries");
        return productionSummaryRepository.findAll();
    }

    /**
     * GET  /production-summaries/:id : get the "id" productionSummary.
     *
     * @param id the id of the productionSummary to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the productionSummary, or with status 404 (Not Found)
     */
    @GetMapping("/production-summaries/{id}")
    public ResponseEntity<ProductionSummary> getProductionSummary(@PathVariable Long id) {
        log.debug("REST request to get ProductionSummary : {}", id);
        Optional<ProductionSummary> productionSummary = productionSummaryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(productionSummary);
    }

    /**
     * DELETE  /production-summaries/:id : delete the "id" productionSummary.
     *
     * @param id the id of the productionSummary to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/production-summaries/{id}")
    public ResponseEntity<Void> deleteProductionSummary(@PathVariable Long id) {
        log.debug("REST request to delete ProductionSummary : {}", id);
        productionSummaryRepository.deleteById(id);
        productionSummarySearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/production-summaries?query=:query : search for the productionSummary corresponding
     * to the query.
     *
     * @param query the query of the productionSummary search
     * @return the result of the search
     */
    @GetMapping("/_search/production-summaries")
    public List<ProductionSummary> searchProductionSummaries(@RequestParam String query) {
        log.debug("REST request to search ProductionSummaries for query {}", query);
        return StreamSupport
            .stream(productionSummarySearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}

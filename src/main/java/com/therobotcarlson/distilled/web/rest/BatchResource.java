package com.therobotcarlson.distilled.web.rest;
import com.therobotcarlson.distilled.service.BatchService;
import com.therobotcarlson.distilled.web.rest.errors.BadRequestAlertException;
import com.therobotcarlson.distilled.web.rest.util.HeaderUtil;
import com.therobotcarlson.distilled.web.rest.util.PaginationUtil;
import com.therobotcarlson.distilled.service.dto.BatchDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Batch.
 */
@RestController
@RequestMapping("/api")
public class BatchResource {

    private final Logger log = LoggerFactory.getLogger(BatchResource.class);

    private static final String ENTITY_NAME = "batch";

    private final BatchService batchService;

    public BatchResource(BatchService batchService) {
        this.batchService = batchService;
    }

    /**
     * POST  /batches : Create a new batch.
     *
     * @param batchDTO the batchDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new batchDTO, or with status 400 (Bad Request) if the batch has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/batches")
    public ResponseEntity<BatchDTO> createBatch(@Valid @RequestBody BatchDTO batchDTO) throws URISyntaxException {
        log.debug("REST request to save Batch : {}", batchDTO);
        if (batchDTO.getId() != null) {
            throw new BadRequestAlertException("A new batch cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BatchDTO result = batchService.save(batchDTO);
        return ResponseEntity.created(new URI("/api/batches/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /batches : Updates an existing batch.
     *
     * @param batchDTO the batchDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated batchDTO,
     * or with status 400 (Bad Request) if the batchDTO is not valid,
     * or with status 500 (Internal Server Error) if the batchDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/batches")
    public ResponseEntity<BatchDTO> updateBatch(@Valid @RequestBody BatchDTO batchDTO) throws URISyntaxException {
        log.debug("REST request to update Batch : {}", batchDTO);
        if (batchDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BatchDTO result = batchService.save(batchDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, batchDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /batches : get all the batches.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of batches in body
     */
    @GetMapping("/batches")
    public ResponseEntity<List<BatchDTO>> getAllBatches(Pageable pageable) {
        log.debug("REST request to get a page of Batches");
        Page<BatchDTO> page = batchService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/batches");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /batches/:id : get the "id" batch.
     *
     * @param id the id of the batchDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the batchDTO, or with status 404 (Not Found)
     */
    @GetMapping("/batches/{id}")
    public ResponseEntity<BatchDTO> getBatch(@PathVariable Long id) {
        log.debug("REST request to get Batch : {}", id);
        Optional<BatchDTO> batchDTO = batchService.findOne(id);
        return ResponseUtil.wrapOrNotFound(batchDTO);
    }

    /**
     * GET  /batches/:id : get the "id" batch.
     *
     * @param id the id of the batchDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the count, or with 0
     */
    @GetMapping("/batches/{id}/barrels")
    public ResponseEntity<Long> getBarrelsForBatch(@PathVariable Long id) {
        log.debug("REST request to get Batch : {}", id);
        Long barrelCount = batchService.countBarrelsByBatch(id);
        return ResponseEntity.ok(barrelCount);
    }

    /**
     * DELETE  /batches/:id : delete the "id" batch.
     *
     * @param id the id of the batchDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/batches/{id}")
    public ResponseEntity<Void> deleteBatch(@PathVariable Long id) {
        log.debug("REST request to delete Batch : {}", id);
        batchService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/batches?query=:query : search for the batch corresponding
     * to the query.
     *
     * @param query the query of the batch search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/batches")
    public ResponseEntity<List<BatchDTO>> searchBatches(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Batches for query {}", query);
        Page<BatchDTO> page = batchService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/batches");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

}

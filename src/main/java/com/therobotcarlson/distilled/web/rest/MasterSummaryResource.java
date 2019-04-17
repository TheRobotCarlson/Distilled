package com.therobotcarlson.distilled.web.rest;
import com.therobotcarlson.distilled.domain.MasterSummary;
import com.therobotcarlson.distilled.repository.MasterSummaryRepository;
import com.therobotcarlson.distilled.repository.search.MasterSummarySearchRepository;
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
 * REST controller for managing MasterSummary.
 */
@RestController
@RequestMapping("/api")
public class MasterSummaryResource {

    private final Logger log = LoggerFactory.getLogger(MasterSummaryResource.class);

    private static final String ENTITY_NAME = "masterSummary";

    private final MasterSummaryRepository masterSummaryRepository;

    private final MasterSummarySearchRepository masterSummarySearchRepository;

    public MasterSummaryResource(MasterSummaryRepository masterSummaryRepository, MasterSummarySearchRepository masterSummarySearchRepository) {
        this.masterSummaryRepository = masterSummaryRepository;
        this.masterSummarySearchRepository = masterSummarySearchRepository;
    }

    /**
     * POST  /master-summaries : Create a new masterSummary.
     *
     * @param masterSummary the masterSummary to create
     * @return the ResponseEntity with status 201 (Created) and with body the new masterSummary, or with status 400 (Bad Request) if the masterSummary has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/master-summaries")
    public ResponseEntity<MasterSummary> createMasterSummary(@RequestBody MasterSummary masterSummary) throws URISyntaxException {
        log.debug("REST request to save MasterSummary : {}", masterSummary);
        if (masterSummary.getId() != null) {
            throw new BadRequestAlertException("A new masterSummary cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MasterSummary result = masterSummaryRepository.save(masterSummary);
        masterSummarySearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/master-summaries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /master-summaries : Updates an existing masterSummary.
     *
     * @param masterSummary the masterSummary to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated masterSummary,
     * or with status 400 (Bad Request) if the masterSummary is not valid,
     * or with status 500 (Internal Server Error) if the masterSummary couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/master-summaries")
    public ResponseEntity<MasterSummary> updateMasterSummary(@RequestBody MasterSummary masterSummary) throws URISyntaxException {
        log.debug("REST request to update MasterSummary : {}", masterSummary);
        if (masterSummary.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MasterSummary result = masterSummaryRepository.save(masterSummary);
        masterSummarySearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, masterSummary.getId().toString()))
            .body(result);
    }

    /**
     * GET  /master-summaries : get all the masterSummaries.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of masterSummaries in body
     */
    @GetMapping("/master-summaries")
    public List<MasterSummary> getAllMasterSummaries() {
        log.debug("REST request to get all MasterSummaries");
        return masterSummaryRepository.findAll();
    }

    /**
     * GET  /master-summaries/:id : get the "id" masterSummary.
     *
     * @param id the id of the masterSummary to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the masterSummary, or with status 404 (Not Found)
     */
    @GetMapping("/master-summaries/{id}")
    public ResponseEntity<MasterSummary> getMasterSummary(@PathVariable Long id) {
        log.debug("REST request to get MasterSummary : {}", id);
        Optional<MasterSummary> masterSummary = masterSummaryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(masterSummary);
    }

    /**
     * DELETE  /master-summaries/:id : delete the "id" masterSummary.
     *
     * @param id the id of the masterSummary to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/master-summaries/{id}")
    public ResponseEntity<Void> deleteMasterSummary(@PathVariable Long id) {
        log.debug("REST request to delete MasterSummary : {}", id);
        masterSummaryRepository.deleteById(id);
        masterSummarySearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/master-summaries?query=:query : search for the masterSummary corresponding
     * to the query.
     *
     * @param query the query of the masterSummary search
     * @return the result of the search
     */
    @GetMapping("/_search/master-summaries")
    public List<MasterSummary> searchMasterSummaries(@RequestParam String query) {
        log.debug("REST request to search MasterSummaries for query {}", query);
        return StreamSupport
            .stream(masterSummarySearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}

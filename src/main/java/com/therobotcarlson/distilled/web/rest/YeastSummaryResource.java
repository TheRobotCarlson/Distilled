package com.therobotcarlson.distilled.web.rest;
import com.therobotcarlson.distilled.domain.YeastSummary;
import com.therobotcarlson.distilled.repository.YeastSummaryRepository;
import com.therobotcarlson.distilled.repository.search.YeastSummarySearchRepository;
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
 * REST controller for managing YeastSummary.
 */
@RestController
@RequestMapping("/api")
public class YeastSummaryResource {

    private final Logger log = LoggerFactory.getLogger(YeastSummaryResource.class);

    private static final String ENTITY_NAME = "yeastSummary";

    private final YeastSummaryRepository yeastSummaryRepository;

    private final YeastSummarySearchRepository yeastSummarySearchRepository;

    public YeastSummaryResource(YeastSummaryRepository yeastSummaryRepository, YeastSummarySearchRepository yeastSummarySearchRepository) {
        this.yeastSummaryRepository = yeastSummaryRepository;
        this.yeastSummarySearchRepository = yeastSummarySearchRepository;
    }

    /**
     * POST  /yeast-summaries : Create a new yeastSummary.
     *
     * @param yeastSummary the yeastSummary to create
     * @return the ResponseEntity with status 201 (Created) and with body the new yeastSummary, or with status 400 (Bad Request) if the yeastSummary has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/yeast-summaries")
    public ResponseEntity<YeastSummary> createYeastSummary(@RequestBody YeastSummary yeastSummary) throws URISyntaxException {
        log.debug("REST request to save YeastSummary : {}", yeastSummary);
        if (yeastSummary.getId() != null) {
            throw new BadRequestAlertException("A new yeastSummary cannot already have an ID", ENTITY_NAME, "idexists");
        }
        YeastSummary result = yeastSummaryRepository.save(yeastSummary);
        yeastSummarySearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/yeast-summaries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /yeast-summaries : Updates an existing yeastSummary.
     *
     * @param yeastSummary the yeastSummary to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated yeastSummary,
     * or with status 400 (Bad Request) if the yeastSummary is not valid,
     * or with status 500 (Internal Server Error) if the yeastSummary couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/yeast-summaries")
    public ResponseEntity<YeastSummary> updateYeastSummary(@RequestBody YeastSummary yeastSummary) throws URISyntaxException {
        log.debug("REST request to update YeastSummary : {}", yeastSummary);
        if (yeastSummary.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        YeastSummary result = yeastSummaryRepository.save(yeastSummary);
        yeastSummarySearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, yeastSummary.getId().toString()))
            .body(result);
    }

    /**
     * GET  /yeast-summaries : get all the yeastSummaries.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of yeastSummaries in body
     */
    @GetMapping("/yeast-summaries")
    public List<YeastSummary> getAllYeastSummaries() {
        log.debug("REST request to get all YeastSummaries");
        return yeastSummaryRepository.findAll();
    }

    /**
     * GET  /yeast-summaries/:id : get the "id" yeastSummary.
     *
     * @param id the id of the yeastSummary to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the yeastSummary, or with status 404 (Not Found)
     */
    @GetMapping("/yeast-summaries/{id}")
    public ResponseEntity<YeastSummary> getYeastSummary(@PathVariable Long id) {
        log.debug("REST request to get YeastSummary : {}", id);
        Optional<YeastSummary> yeastSummary = yeastSummaryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(yeastSummary);
    }

    /**
     * DELETE  /yeast-summaries/:id : delete the "id" yeastSummary.
     *
     * @param id the id of the yeastSummary to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/yeast-summaries/{id}")
    public ResponseEntity<Void> deleteYeastSummary(@PathVariable Long id) {
        log.debug("REST request to delete YeastSummary : {}", id);
        yeastSummaryRepository.deleteById(id);
        yeastSummarySearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/yeast-summaries?query=:query : search for the yeastSummary corresponding
     * to the query.
     *
     * @param query the query of the yeastSummary search
     * @return the result of the search
     */
    @GetMapping("/_search/yeast-summaries")
    public List<YeastSummary> searchYeastSummaries(@RequestParam String query) {
        log.debug("REST request to search YeastSummaries for query {}", query);
        return StreamSupport
            .stream(yeastSummarySearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}

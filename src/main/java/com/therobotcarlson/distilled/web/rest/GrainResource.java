package com.therobotcarlson.distilled.web.rest;
import com.therobotcarlson.distilled.service.GrainService;
import com.therobotcarlson.distilled.web.rest.errors.BadRequestAlertException;
import com.therobotcarlson.distilled.web.rest.util.HeaderUtil;
import com.therobotcarlson.distilled.web.rest.util.PaginationUtil;
import com.therobotcarlson.distilled.service.dto.GrainDTO;
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
 * REST controller for managing Grain.
 */
@RestController
@RequestMapping("/api")
public class GrainResource {

    private final Logger log = LoggerFactory.getLogger(GrainResource.class);

    private static final String ENTITY_NAME = "grain";

    private final GrainService grainService;

    public GrainResource(GrainService grainService) {
        this.grainService = grainService;
    }

    /**
     * POST  /grains : Create a new grain.
     *
     * @param grainDTO the grainDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new grainDTO, or with status 400 (Bad Request) if the grain has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/grains")
    public ResponseEntity<GrainDTO> createGrain(@Valid @RequestBody GrainDTO grainDTO) throws URISyntaxException {
        log.debug("REST request to save Grain : {}", grainDTO);
        if (grainDTO.getId() != null) {
            throw new BadRequestAlertException("A new grain cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GrainDTO result = grainService.save(grainDTO);
        return ResponseEntity.created(new URI("/api/grains/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /grains : Updates an existing grain.
     *
     * @param grainDTO the grainDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated grainDTO,
     * or with status 400 (Bad Request) if the grainDTO is not valid,
     * or with status 500 (Internal Server Error) if the grainDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/grains")
    public ResponseEntity<GrainDTO> updateGrain(@Valid @RequestBody GrainDTO grainDTO) throws URISyntaxException {
        log.debug("REST request to update Grain : {}", grainDTO);
        if (grainDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GrainDTO result = grainService.save(grainDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, grainDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /grains : get all the grains.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of grains in body
     */
    @GetMapping("/grains")
    public ResponseEntity<List<GrainDTO>> getAllGrains(Pageable pageable) {
        log.debug("REST request to get a page of Grains");
        Page<GrainDTO> page = grainService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/grains");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /grains/:id : get the "id" grain.
     *
     * @param id the id of the grainDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the grainDTO, or with status 404 (Not Found)
     */
    @GetMapping("/grains/{id}")
    public ResponseEntity<GrainDTO> getGrain(@PathVariable Long id) {
        log.debug("REST request to get Grain : {}", id);
        Optional<GrainDTO> grainDTO = grainService.findOne(id);
        return ResponseUtil.wrapOrNotFound(grainDTO);
    }

    /**
     * DELETE  /grains/:id : delete the "id" grain.
     *
     * @param id the id of the grainDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/grains/{id}")
    public ResponseEntity<Void> deleteGrain(@PathVariable Long id) {
        log.debug("REST request to delete Grain : {}", id);
        grainService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/grains?query=:query : search for the grain corresponding
     * to the query.
     *
     * @param query the query of the grain search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/grains")
    public ResponseEntity<List<GrainDTO>> searchGrains(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Grains for query {}", query);
        Page<GrainDTO> page = grainService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/grains");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

}

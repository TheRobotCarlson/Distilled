package com.therobotcarlson.distilled.web.rest;
import com.therobotcarlson.distilled.service.BarrelService;
import com.therobotcarlson.distilled.web.rest.errors.BadRequestAlertException;
import com.therobotcarlson.distilled.web.rest.util.HeaderUtil;
import com.therobotcarlson.distilled.web.rest.util.PaginationUtil;
import com.therobotcarlson.distilled.service.dto.BarrelDTO;
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
 * REST controller for managing Barrel.
 */
@RestController
@RequestMapping("/api")
public class BarrelResource {

    private final Logger log = LoggerFactory.getLogger(BarrelResource.class);

    private static final String ENTITY_NAME = "barrel";

    private final BarrelService barrelService;

    public BarrelResource(BarrelService barrelService) {
        this.barrelService = barrelService;
    }

    /**
     * POST  /barrels : Create a new barrel.
     *
     * @param barrelDTO the barrelDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new barrelDTO, or with status 400 (Bad Request) if the barrel has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/barrels")
    public ResponseEntity<BarrelDTO> createBarrel(@Valid @RequestBody BarrelDTO barrelDTO) throws URISyntaxException {
        log.debug("REST request to save Barrel : {}", barrelDTO);
        if (barrelDTO.getId() != null) {
            throw new BadRequestAlertException("A new barrel cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BarrelDTO result = barrelService.save(barrelDTO);
        return ResponseEntity.created(new URI("/api/barrels/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /barrels : Updates an existing barrel.
     *
     * @param barrelDTO the barrelDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated barrelDTO,
     * or with status 400 (Bad Request) if the barrelDTO is not valid,
     * or with status 500 (Internal Server Error) if the barrelDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/barrels")
    public ResponseEntity<BarrelDTO> updateBarrel(@Valid @RequestBody BarrelDTO barrelDTO) throws URISyntaxException {
        log.debug("REST request to update Barrel : {}", barrelDTO);
        if (barrelDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BarrelDTO result = barrelService.save(barrelDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, barrelDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /barrels : get all the barrels.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of barrels in body
     */
    @GetMapping("/barrels")
    public ResponseEntity<List<BarrelDTO>> getAllBarrels(Pageable pageable) {
        log.debug("REST request to get a page of Barrels");
        Page<BarrelDTO> page = barrelService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/barrels");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /barrels/:id : get the "id" barrel.
     *
     * @param id the id of the barrelDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the barrelDTO, or with status 404 (Not Found)
     */
    @GetMapping("/barrels/{id}")
    public ResponseEntity<BarrelDTO> getBarrel(@PathVariable Long id) {
        log.debug("REST request to get Barrel : {}", id);
        Optional<BarrelDTO> barrelDTO = barrelService.findOne(id);
        return ResponseUtil.wrapOrNotFound(barrelDTO);
    }

    /**
     * DELETE  /barrels/:id : delete the "id" barrel.
     *
     * @param id the id of the barrelDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/barrels/{id}")
    public ResponseEntity<Void> deleteBarrel(@PathVariable Long id) {
        log.debug("REST request to delete Barrel : {}", id);
        barrelService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/barrels?query=:query : search for the barrel corresponding
     * to the query.
     *
     * @param query the query of the barrel search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/barrels")
    public ResponseEntity<List<BarrelDTO>> searchBarrels(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Barrels for query {}", query);
        Page<BarrelDTO> page = barrelService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/barrels");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

}

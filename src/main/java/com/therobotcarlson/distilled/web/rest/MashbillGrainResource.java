package com.therobotcarlson.distilled.web.rest;
import com.therobotcarlson.distilled.service.MashbillGrainService;
import com.therobotcarlson.distilled.web.rest.errors.BadRequestAlertException;
import com.therobotcarlson.distilled.web.rest.util.HeaderUtil;
import com.therobotcarlson.distilled.service.dto.MashbillGrainDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
 * REST controller for managing MashbillGrain.
 */
@RestController
@RequestMapping("/api")
public class MashbillGrainResource {

    private final Logger log = LoggerFactory.getLogger(MashbillGrainResource.class);

    private static final String ENTITY_NAME = "mashbillGrain";

    private final MashbillGrainService mashbillGrainService;

    public MashbillGrainResource(MashbillGrainService mashbillGrainService) {
        this.mashbillGrainService = mashbillGrainService;
    }

    /**
     * POST  /mashbill-grains : Create a new mashbillGrain.
     *
     * @param mashbillGrainDTO the mashbillGrainDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mashbillGrainDTO, or with status 400 (Bad Request) if the mashbillGrain has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/mashbill-grains")
    public ResponseEntity<MashbillGrainDTO> createMashbillGrain(@Valid @RequestBody MashbillGrainDTO mashbillGrainDTO) throws URISyntaxException {
        log.debug("REST request to save MashbillGrain : {}", mashbillGrainDTO);
        if (mashbillGrainDTO.getId() != null) {
            throw new BadRequestAlertException("A new mashbillGrain cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MashbillGrainDTO result = mashbillGrainService.save(mashbillGrainDTO);
        return ResponseEntity.created(new URI("/api/mashbill-grains/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /mashbill-grains : Updates an existing mashbillGrain.
     *
     * @param mashbillGrainDTO the mashbillGrainDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mashbillGrainDTO,
     * or with status 400 (Bad Request) if the mashbillGrainDTO is not valid,
     * or with status 500 (Internal Server Error) if the mashbillGrainDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/mashbill-grains")
    public ResponseEntity<MashbillGrainDTO> updateMashbillGrain(@Valid @RequestBody MashbillGrainDTO mashbillGrainDTO) throws URISyntaxException {
        log.debug("REST request to update MashbillGrain : {}", mashbillGrainDTO);
        if (mashbillGrainDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MashbillGrainDTO result = mashbillGrainService.save(mashbillGrainDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mashbillGrainDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /mashbill-grains : get all the mashbillGrains.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of mashbillGrains in body
     */
    @GetMapping("/mashbill-grains")
    public List<MashbillGrainDTO> getAllMashbillGrains() {
        log.debug("REST request to get all MashbillGrains");
        return mashbillGrainService.findAll();
    }

    /**
     * GET  /mashbill-grains/:id : get the "id" mashbillGrain.
     *
     * @param id the id of the mashbillGrainDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mashbillGrainDTO, or with status 404 (Not Found)
     */
    @GetMapping("/mashbill-grains/{id}")
    public ResponseEntity<MashbillGrainDTO> getMashbillGrain(@PathVariable Long id) {
        log.debug("REST request to get MashbillGrain : {}", id);
        Optional<MashbillGrainDTO> mashbillGrainDTO = mashbillGrainService.findOne(id);
        return ResponseUtil.wrapOrNotFound(mashbillGrainDTO);
    }

    /**
     * DELETE  /mashbill-grains/:id : delete the "id" mashbillGrain.
     *
     * @param id the id of the mashbillGrainDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/mashbill-grains/{id}")
    public ResponseEntity<Void> deleteMashbillGrain(@PathVariable Long id) {
        log.debug("REST request to delete MashbillGrain : {}", id);
        mashbillGrainService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/mashbill-grains?query=:query : search for the mashbillGrain corresponding
     * to the query.
     *
     * @param query the query of the mashbillGrain search
     * @return the result of the search
     */
    @GetMapping("/_search/mashbill-grains")
    public List<MashbillGrainDTO> searchMashbillGrains(@RequestParam String query) {
        log.debug("REST request to search MashbillGrains for query {}", query);
        return mashbillGrainService.search(query);
    }

}

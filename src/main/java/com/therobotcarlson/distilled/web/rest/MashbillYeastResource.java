package com.therobotcarlson.distilled.web.rest;
import com.therobotcarlson.distilled.service.MashbillYeastService;
import com.therobotcarlson.distilled.web.rest.errors.BadRequestAlertException;
import com.therobotcarlson.distilled.web.rest.util.HeaderUtil;
import com.therobotcarlson.distilled.service.dto.MashbillYeastDTO;
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
 * REST controller for managing MashbillYeast.
 */
@RestController
@RequestMapping("/api")
public class MashbillYeastResource {

    private final Logger log = LoggerFactory.getLogger(MashbillYeastResource.class);

    private static final String ENTITY_NAME = "mashbillYeast";

    private final MashbillYeastService mashbillYeastService;

    public MashbillYeastResource(MashbillYeastService mashbillYeastService) {
        this.mashbillYeastService = mashbillYeastService;
    }

    /**
     * POST  /mashbill-yeasts : Create a new mashbillYeast.
     *
     * @param mashbillYeastDTO the mashbillYeastDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mashbillYeastDTO, or with status 400 (Bad Request) if the mashbillYeast has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/mashbill-yeasts")
    public ResponseEntity<MashbillYeastDTO> createMashbillYeast(@Valid @RequestBody MashbillYeastDTO mashbillYeastDTO) throws URISyntaxException {
        log.debug("REST request to save MashbillYeast : {}", mashbillYeastDTO);
        if (mashbillYeastDTO.getId() != null) {
            throw new BadRequestAlertException("A new mashbillYeast cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MashbillYeastDTO result = mashbillYeastService.save(mashbillYeastDTO);
        return ResponseEntity.created(new URI("/api/mashbill-yeasts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /mashbill-yeasts : Updates an existing mashbillYeast.
     *
     * @param mashbillYeastDTO the mashbillYeastDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mashbillYeastDTO,
     * or with status 400 (Bad Request) if the mashbillYeastDTO is not valid,
     * or with status 500 (Internal Server Error) if the mashbillYeastDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/mashbill-yeasts")
    public ResponseEntity<MashbillYeastDTO> updateMashbillYeast(@Valid @RequestBody MashbillYeastDTO mashbillYeastDTO) throws URISyntaxException {
        log.debug("REST request to update MashbillYeast : {}", mashbillYeastDTO);
        if (mashbillYeastDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MashbillYeastDTO result = mashbillYeastService.save(mashbillYeastDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mashbillYeastDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /mashbill-yeasts : get all the mashbillYeasts.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of mashbillYeasts in body
     */
    @GetMapping("/mashbill-yeasts")
    public List<MashbillYeastDTO> getAllMashbillYeasts(@RequestParam(required = false) String filter) {
        if ("mashbill-is-null".equals(filter)) {
            log.debug("REST request to get all MashbillYeasts where mashbill is null");
            return mashbillYeastService.findAllWhereMashbillIsNull();
        }
        log.debug("REST request to get all MashbillYeasts");
        return mashbillYeastService.findAll();
    }

    /**
     * GET  /mashbill-yeasts/:id : get the "id" mashbillYeast.
     *
     * @param id the id of the mashbillYeastDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mashbillYeastDTO, or with status 404 (Not Found)
     */
    @GetMapping("/mashbill-yeasts/{id}")
    public ResponseEntity<MashbillYeastDTO> getMashbillYeast(@PathVariable Long id) {
        log.debug("REST request to get MashbillYeast : {}", id);
        Optional<MashbillYeastDTO> mashbillYeastDTO = mashbillYeastService.findOne(id);
        return ResponseUtil.wrapOrNotFound(mashbillYeastDTO);
    }

    /**
     * DELETE  /mashbill-yeasts/:id : delete the "id" mashbillYeast.
     *
     * @param id the id of the mashbillYeastDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/mashbill-yeasts/{id}")
    public ResponseEntity<Void> deleteMashbillYeast(@PathVariable Long id) {
        log.debug("REST request to delete MashbillYeast : {}", id);
        mashbillYeastService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/mashbill-yeasts?query=:query : search for the mashbillYeast corresponding
     * to the query.
     *
     * @param query the query of the mashbillYeast search
     * @return the result of the search
     */
    @GetMapping("/_search/mashbill-yeasts")
    public List<MashbillYeastDTO> searchMashbillYeasts(@RequestParam String query) {
        log.debug("REST request to search MashbillYeasts for query {}", query);
        return mashbillYeastService.search(query);
    }

}

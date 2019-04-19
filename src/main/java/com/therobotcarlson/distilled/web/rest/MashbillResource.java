package com.therobotcarlson.distilled.web.rest;
import com.therobotcarlson.distilled.service.MashbillService;
import com.therobotcarlson.distilled.web.rest.errors.BadRequestAlertException;
import com.therobotcarlson.distilled.web.rest.util.HeaderUtil;
import com.therobotcarlson.distilled.web.rest.util.PaginationUtil;
import com.therobotcarlson.distilled.service.dto.MashbillDTO;
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
 * REST controller for managing Mashbill.
 */
@RestController
@RequestMapping("/api")
public class MashbillResource {

    private final Logger log = LoggerFactory.getLogger(MashbillResource.class);

    private static final String ENTITY_NAME = "mashbill";

    private final MashbillService mashbillService;

    public MashbillResource(MashbillService mashbillService) {
        this.mashbillService = mashbillService;
    }

    /**
     * POST  /mashbills : Create a new mashbill.
     *
     * @param mashbillDTO the mashbillDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mashbillDTO, or with status 400 (Bad Request) if the mashbill has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/mashbills")
    public ResponseEntity<MashbillDTO> createMashbill(@Valid @RequestBody MashbillDTO mashbillDTO) throws URISyntaxException {
        log.debug("REST request to save Mashbill : {}", mashbillDTO);
        if (mashbillDTO.getId() != null) {
            throw new BadRequestAlertException("A new mashbill cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MashbillDTO result = mashbillService.save(mashbillDTO);
        return ResponseEntity.created(new URI("/api/mashbills/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /mashbills : Updates an existing mashbill.
     *
     * @param mashbillDTO the mashbillDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mashbillDTO,
     * or with status 400 (Bad Request) if the mashbillDTO is not valid,
     * or with status 500 (Internal Server Error) if the mashbillDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/mashbills")
    public ResponseEntity<MashbillDTO> updateMashbill(@Valid @RequestBody MashbillDTO mashbillDTO) throws URISyntaxException {
        log.debug("REST request to update Mashbill : {}", mashbillDTO);
        if (mashbillDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MashbillDTO result = mashbillService.save(mashbillDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mashbillDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /mashbills : get all the mashbills.
     *
     * @param pageable the pagination information
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of mashbills in body
     */
    @GetMapping("/mashbills")
    public ResponseEntity<List<MashbillDTO>> getAllMashbills(Pageable pageable, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of Mashbills");
        Page<MashbillDTO> page;
        if (eagerload) {
            page = mashbillService.findAllWithEagerRelationships(pageable);
        } else {
            page = mashbillService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, String.format("/api/mashbills?eagerload=%b", eagerload));
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /mashbills/:id : get the "id" mashbill.
     *
     * @param id the id of the mashbillDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mashbillDTO, or with status 404 (Not Found)
     */
    @GetMapping("/mashbills/{id}")
    public ResponseEntity<MashbillDTO> getMashbill(@PathVariable Long id) {
        log.debug("REST request to get Mashbill : {}", id);
        Optional<MashbillDTO> mashbillDTO = mashbillService.findOne(id);
        return ResponseUtil.wrapOrNotFound(mashbillDTO);
    }

    /**
     * DELETE  /mashbills/:id : delete the "id" mashbill.
     *
     * @param id the id of the mashbillDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/mashbills/{id}")
    public ResponseEntity<Void> deleteMashbill(@PathVariable Long id) {
        log.debug("REST request to delete Mashbill : {}", id);
        mashbillService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/mashbills?query=:query : search for the mashbill corresponding
     * to the query.
     *
     * @param query the query of the mashbill search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/mashbills")
    public ResponseEntity<List<MashbillDTO>> searchMashbills(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Mashbills for query {}", query);
        Page<MashbillDTO> page = mashbillService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/mashbills");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

}

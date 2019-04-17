package com.therobotcarlson.distilled.web.rest;
import com.therobotcarlson.distilled.service.SpiritService;
import com.therobotcarlson.distilled.web.rest.errors.BadRequestAlertException;
import com.therobotcarlson.distilled.web.rest.util.HeaderUtil;
import com.therobotcarlson.distilled.web.rest.util.PaginationUtil;
import com.therobotcarlson.distilled.service.dto.SpiritDTO;
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
 * REST controller for managing Spirit.
 */
@RestController
@RequestMapping("/api")
public class SpiritResource {

    private final Logger log = LoggerFactory.getLogger(SpiritResource.class);

    private static final String ENTITY_NAME = "spirit";

    private final SpiritService spiritService;

    public SpiritResource(SpiritService spiritService) {
        this.spiritService = spiritService;
    }

    /**
     * POST  /spirits : Create a new spirit.
     *
     * @param spiritDTO the spiritDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new spiritDTO, or with status 400 (Bad Request) if the spirit has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/spirits")
    public ResponseEntity<SpiritDTO> createSpirit(@Valid @RequestBody SpiritDTO spiritDTO) throws URISyntaxException {
        log.debug("REST request to save Spirit : {}", spiritDTO);
        if (spiritDTO.getId() != null) {
            throw new BadRequestAlertException("A new spirit cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SpiritDTO result = spiritService.save(spiritDTO);
        return ResponseEntity.created(new URI("/api/spirits/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /spirits : Updates an existing spirit.
     *
     * @param spiritDTO the spiritDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated spiritDTO,
     * or with status 400 (Bad Request) if the spiritDTO is not valid,
     * or with status 500 (Internal Server Error) if the spiritDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/spirits")
    public ResponseEntity<SpiritDTO> updateSpirit(@Valid @RequestBody SpiritDTO spiritDTO) throws URISyntaxException {
        log.debug("REST request to update Spirit : {}", spiritDTO);
        if (spiritDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SpiritDTO result = spiritService.save(spiritDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, spiritDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /spirits : get all the spirits.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of spirits in body
     */
    @GetMapping("/spirits")
    public ResponseEntity<List<SpiritDTO>> getAllSpirits(Pageable pageable) {
        log.debug("REST request to get a page of Spirits");
        Page<SpiritDTO> page = spiritService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/spirits");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /spirits/:id : get the "id" spirit.
     *
     * @param id the id of the spiritDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the spiritDTO, or with status 404 (Not Found)
     */
    @GetMapping("/spirits/{id}")
    public ResponseEntity<SpiritDTO> getSpirit(@PathVariable Long id) {
        log.debug("REST request to get Spirit : {}", id);
        Optional<SpiritDTO> spiritDTO = spiritService.findOne(id);
        return ResponseUtil.wrapOrNotFound(spiritDTO);
    }

    /**
     * DELETE  /spirits/:id : delete the "id" spirit.
     *
     * @param id the id of the spiritDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/spirits/{id}")
    public ResponseEntity<Void> deleteSpirit(@PathVariable Long id) {
        log.debug("REST request to delete Spirit : {}", id);
        spiritService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/spirits?query=:query : search for the spirit corresponding
     * to the query.
     *
     * @param query the query of the spirit search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/spirits")
    public ResponseEntity<List<SpiritDTO>> searchSpirits(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Spirits for query {}", query);
        Page<SpiritDTO> page = spiritService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/spirits");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

}

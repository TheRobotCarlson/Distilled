package com.therobotcarlson.distilled.web.rest;
import com.therobotcarlson.distilled.service.YeastService;
import com.therobotcarlson.distilled.web.rest.errors.BadRequestAlertException;
import com.therobotcarlson.distilled.web.rest.util.HeaderUtil;
import com.therobotcarlson.distilled.web.rest.util.PaginationUtil;
import com.therobotcarlson.distilled.service.dto.YeastDTO;
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
 * REST controller for managing Yeast.
 */
@RestController
@RequestMapping("/api")
public class YeastResource {

    private final Logger log = LoggerFactory.getLogger(YeastResource.class);

    private static final String ENTITY_NAME = "yeast";

    private final YeastService yeastService;

    public YeastResource(YeastService yeastService) {
        this.yeastService = yeastService;
    }

    /**
     * POST  /yeasts : Create a new yeast.
     *
     * @param yeastDTO the yeastDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new yeastDTO, or with status 400 (Bad Request) if the yeast has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/yeasts")
    public ResponseEntity<YeastDTO> createYeast(@Valid @RequestBody YeastDTO yeastDTO) throws URISyntaxException {
        log.debug("REST request to save Yeast : {}", yeastDTO);
        if (yeastDTO.getId() != null) {
            throw new BadRequestAlertException("A new yeast cannot already have an ID", ENTITY_NAME, "idexists");
        }
        YeastDTO result = yeastService.save(yeastDTO);
        return ResponseEntity.created(new URI("/api/yeasts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /yeasts : Updates an existing yeast.
     *
     * @param yeastDTO the yeastDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated yeastDTO,
     * or with status 400 (Bad Request) if the yeastDTO is not valid,
     * or with status 500 (Internal Server Error) if the yeastDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/yeasts")
    public ResponseEntity<YeastDTO> updateYeast(@Valid @RequestBody YeastDTO yeastDTO) throws URISyntaxException {
        log.debug("REST request to update Yeast : {}", yeastDTO);
        if (yeastDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        YeastDTO result = yeastService.save(yeastDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, yeastDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /yeasts : get all the yeasts.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of yeasts in body
     */
    @GetMapping("/yeasts")
    public ResponseEntity<List<YeastDTO>> getAllYeasts(Pageable pageable) {
        log.debug("REST request to get a page of Yeasts");
        Page<YeastDTO> page = yeastService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/yeasts");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /yeasts/:id : get the "id" yeast.
     *
     * @param id the id of the yeastDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the yeastDTO, or with status 404 (Not Found)
     */
    @GetMapping("/yeasts/{id}")
    public ResponseEntity<YeastDTO> getYeast(@PathVariable Long id) {
        log.debug("REST request to get Yeast : {}", id);
        Optional<YeastDTO> yeastDTO = yeastService.findOne(id);
        return ResponseUtil.wrapOrNotFound(yeastDTO);
    }

    /**
     * DELETE  /yeasts/:id : delete the "id" yeast.
     *
     * @param id the id of the yeastDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/yeasts/{id}")
    public ResponseEntity<Void> deleteYeast(@PathVariable Long id) {
        log.debug("REST request to delete Yeast : {}", id);
        yeastService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/yeasts?query=:query : search for the yeast corresponding
     * to the query.
     *
     * @param query the query of the yeast search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/yeasts")
    public ResponseEntity<List<YeastDTO>> searchYeasts(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Yeasts for query {}", query);
        Page<YeastDTO> page = yeastService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/yeasts");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

}

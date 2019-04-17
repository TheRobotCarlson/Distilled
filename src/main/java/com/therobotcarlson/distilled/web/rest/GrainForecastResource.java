package com.therobotcarlson.distilled.web.rest;
import com.therobotcarlson.distilled.domain.GrainForecast;
import com.therobotcarlson.distilled.repository.GrainForecastRepository;
import com.therobotcarlson.distilled.repository.search.GrainForecastSearchRepository;
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
 * REST controller for managing GrainForecast.
 */
@RestController
@RequestMapping("/api")
public class GrainForecastResource {

    private final Logger log = LoggerFactory.getLogger(GrainForecastResource.class);

    private static final String ENTITY_NAME = "grainForecast";

    private final GrainForecastRepository grainForecastRepository;

    private final GrainForecastSearchRepository grainForecastSearchRepository;

    public GrainForecastResource(GrainForecastRepository grainForecastRepository, GrainForecastSearchRepository grainForecastSearchRepository) {
        this.grainForecastRepository = grainForecastRepository;
        this.grainForecastSearchRepository = grainForecastSearchRepository;
    }

    /**
     * POST  /grain-forecasts : Create a new grainForecast.
     *
     * @param grainForecast the grainForecast to create
     * @return the ResponseEntity with status 201 (Created) and with body the new grainForecast, or with status 400 (Bad Request) if the grainForecast has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/grain-forecasts")
    public ResponseEntity<GrainForecast> createGrainForecast(@RequestBody GrainForecast grainForecast) throws URISyntaxException {
        log.debug("REST request to save GrainForecast : {}", grainForecast);
        if (grainForecast.getId() != null) {
            throw new BadRequestAlertException("A new grainForecast cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GrainForecast result = grainForecastRepository.save(grainForecast);
        grainForecastSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/grain-forecasts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /grain-forecasts : Updates an existing grainForecast.
     *
     * @param grainForecast the grainForecast to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated grainForecast,
     * or with status 400 (Bad Request) if the grainForecast is not valid,
     * or with status 500 (Internal Server Error) if the grainForecast couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/grain-forecasts")
    public ResponseEntity<GrainForecast> updateGrainForecast(@RequestBody GrainForecast grainForecast) throws URISyntaxException {
        log.debug("REST request to update GrainForecast : {}", grainForecast);
        if (grainForecast.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GrainForecast result = grainForecastRepository.save(grainForecast);
        grainForecastSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, grainForecast.getId().toString()))
            .body(result);
    }

    /**
     * GET  /grain-forecasts : get all the grainForecasts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of grainForecasts in body
     */
    @GetMapping("/grain-forecasts")
    public List<GrainForecast> getAllGrainForecasts() {
        log.debug("REST request to get all GrainForecasts");
        return grainForecastRepository.findAll();
    }

    /**
     * GET  /grain-forecasts/:id : get the "id" grainForecast.
     *
     * @param id the id of the grainForecast to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the grainForecast, or with status 404 (Not Found)
     */
    @GetMapping("/grain-forecasts/{id}")
    public ResponseEntity<GrainForecast> getGrainForecast(@PathVariable Long id) {
        log.debug("REST request to get GrainForecast : {}", id);
        Optional<GrainForecast> grainForecast = grainForecastRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(grainForecast);
    }

    /**
     * DELETE  /grain-forecasts/:id : delete the "id" grainForecast.
     *
     * @param id the id of the grainForecast to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/grain-forecasts/{id}")
    public ResponseEntity<Void> deleteGrainForecast(@PathVariable Long id) {
        log.debug("REST request to delete GrainForecast : {}", id);
        grainForecastRepository.deleteById(id);
        grainForecastSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/grain-forecasts?query=:query : search for the grainForecast corresponding
     * to the query.
     *
     * @param query the query of the grainForecast search
     * @return the result of the search
     */
    @GetMapping("/_search/grain-forecasts")
    public List<GrainForecast> searchGrainForecasts(@RequestParam String query) {
        log.debug("REST request to search GrainForecasts for query {}", query);
        return StreamSupport
            .stream(grainForecastSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}

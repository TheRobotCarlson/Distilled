package com.therobotcarlson.distilled.repository.search;

import com.therobotcarlson.distilled.domain.Barrel;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Barrel entity.
 */
public interface BarrelSearchRepository extends ElasticsearchRepository<Barrel, Long> {
}

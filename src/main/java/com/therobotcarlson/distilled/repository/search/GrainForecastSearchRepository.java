package com.therobotcarlson.distilled.repository.search;

import com.therobotcarlson.distilled.domain.GrainForecast;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the GrainForecast entity.
 */
public interface GrainForecastSearchRepository extends ElasticsearchRepository<GrainForecast, Long> {
}

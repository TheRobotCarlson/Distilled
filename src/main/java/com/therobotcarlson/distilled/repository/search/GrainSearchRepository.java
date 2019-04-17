package com.therobotcarlson.distilled.repository.search;

import com.therobotcarlson.distilled.domain.Grain;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Grain entity.
 */
public interface GrainSearchRepository extends ElasticsearchRepository<Grain, Long> {
}

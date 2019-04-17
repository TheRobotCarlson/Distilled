package com.therobotcarlson.distilled.repository.search;

import com.therobotcarlson.distilled.domain.Batch;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Batch entity.
 */
public interface BatchSearchRepository extends ElasticsearchRepository<Batch, Long> {
}

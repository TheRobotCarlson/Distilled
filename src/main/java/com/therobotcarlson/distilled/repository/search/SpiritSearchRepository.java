package com.therobotcarlson.distilled.repository.search;

import com.therobotcarlson.distilled.domain.Spirit;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Spirit entity.
 */
public interface SpiritSearchRepository extends ElasticsearchRepository<Spirit, Long> {
}

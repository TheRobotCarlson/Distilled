package com.therobotcarlson.distilled.repository.search;

import com.therobotcarlson.distilled.domain.Mashbill;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Mashbill entity.
 */
public interface MashbillSearchRepository extends ElasticsearchRepository<Mashbill, Long> {
}

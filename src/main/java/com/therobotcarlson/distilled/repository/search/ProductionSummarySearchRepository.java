package com.therobotcarlson.distilled.repository.search;

import com.therobotcarlson.distilled.domain.ProductionSummary;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ProductionSummary entity.
 */
public interface ProductionSummarySearchRepository extends ElasticsearchRepository<ProductionSummary, Long> {
}

package com.therobotcarlson.distilled.repository.search;

import com.therobotcarlson.distilled.domain.YeastSummary;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the YeastSummary entity.
 */
public interface YeastSummarySearchRepository extends ElasticsearchRepository<YeastSummary, Long> {
}

package com.therobotcarlson.distilled.repository.search;

import com.therobotcarlson.distilled.domain.MasterSummary;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the MasterSummary entity.
 */
public interface MasterSummarySearchRepository extends ElasticsearchRepository<MasterSummary, Long> {
}

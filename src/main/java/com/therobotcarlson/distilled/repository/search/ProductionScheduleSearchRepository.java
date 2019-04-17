package com.therobotcarlson.distilled.repository.search;

import com.therobotcarlson.distilled.domain.ProductionSchedule;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ProductionSchedule entity.
 */
public interface ProductionScheduleSearchRepository extends ElasticsearchRepository<ProductionSchedule, Long> {
}

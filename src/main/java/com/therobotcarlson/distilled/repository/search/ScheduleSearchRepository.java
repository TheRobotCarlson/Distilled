package com.therobotcarlson.distilled.repository.search;

import com.therobotcarlson.distilled.domain.Schedule;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Schedule entity.
 */
public interface ScheduleSearchRepository extends ElasticsearchRepository<Schedule, Long> {
}

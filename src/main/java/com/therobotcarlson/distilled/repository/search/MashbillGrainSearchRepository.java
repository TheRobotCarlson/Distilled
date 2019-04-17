package com.therobotcarlson.distilled.repository.search;

import com.therobotcarlson.distilled.domain.MashbillGrain;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the MashbillGrain entity.
 */
public interface MashbillGrainSearchRepository extends ElasticsearchRepository<MashbillGrain, Long> {
}

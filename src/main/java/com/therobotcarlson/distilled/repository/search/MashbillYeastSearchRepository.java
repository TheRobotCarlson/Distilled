package com.therobotcarlson.distilled.repository.search;

import com.therobotcarlson.distilled.domain.MashbillYeast;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the MashbillYeast entity.
 */
public interface MashbillYeastSearchRepository extends ElasticsearchRepository<MashbillYeast, Long> {
}

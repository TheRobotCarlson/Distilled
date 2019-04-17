package com.therobotcarlson.distilled.repository.search;

import com.therobotcarlson.distilled.domain.Yeast;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Yeast entity.
 */
public interface YeastSearchRepository extends ElasticsearchRepository<Yeast, Long> {
}

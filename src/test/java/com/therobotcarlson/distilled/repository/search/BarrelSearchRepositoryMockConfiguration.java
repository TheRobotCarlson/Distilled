package com.therobotcarlson.distilled.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of BarrelSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class BarrelSearchRepositoryMockConfiguration {

    @MockBean
    private BarrelSearchRepository mockBarrelSearchRepository;

}

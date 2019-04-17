package com.therobotcarlson.distilled.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of GrainSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class GrainSearchRepositoryMockConfiguration {

    @MockBean
    private GrainSearchRepository mockGrainSearchRepository;

}

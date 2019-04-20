package com.therobotcarlson.distilled.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.therobotcarlson.distilled.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.therobotcarlson.distilled.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.therobotcarlson.distilled.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.therobotcarlson.distilled.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.therobotcarlson.distilled.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.therobotcarlson.distilled.domain.Grain.class.getName(), jcacheConfiguration);
            cm.createCache(com.therobotcarlson.distilled.domain.Yeast.class.getName(), jcacheConfiguration);
            cm.createCache(com.therobotcarlson.distilled.domain.MashbillGrain.class.getName(), jcacheConfiguration);
            cm.createCache(com.therobotcarlson.distilled.domain.MashbillGrain.class.getName() + ".mashbills", jcacheConfiguration);
            cm.createCache(com.therobotcarlson.distilled.domain.Customer.class.getName(), jcacheConfiguration);
            cm.createCache(com.therobotcarlson.distilled.domain.Customer.class.getName() + ".mashbills", jcacheConfiguration);
            cm.createCache(com.therobotcarlson.distilled.domain.Customer.class.getName() + ".barrels", jcacheConfiguration);
            cm.createCache(com.therobotcarlson.distilled.domain.Customer.class.getName() + ".schedules", jcacheConfiguration);
            cm.createCache(com.therobotcarlson.distilled.domain.Spirit.class.getName(), jcacheConfiguration);
            cm.createCache(com.therobotcarlson.distilled.domain.Mashbill.class.getName(), jcacheConfiguration);
            cm.createCache(com.therobotcarlson.distilled.domain.Mashbill.class.getName() + ".barrels", jcacheConfiguration);
            cm.createCache(com.therobotcarlson.distilled.domain.Mashbill.class.getName() + ".schedules", jcacheConfiguration);
            cm.createCache(com.therobotcarlson.distilled.domain.Mashbill.class.getName() + ".grainCounts", jcacheConfiguration);
            cm.createCache(com.therobotcarlson.distilled.domain.Warehouse.class.getName(), jcacheConfiguration);
            cm.createCache(com.therobotcarlson.distilled.domain.Warehouse.class.getName() + ".barrels", jcacheConfiguration);
            cm.createCache(com.therobotcarlson.distilled.domain.Warehouse.class.getName() + ".schedules", jcacheConfiguration);
            cm.createCache(com.therobotcarlson.distilled.domain.Barrel.class.getName(), jcacheConfiguration);
            cm.createCache(com.therobotcarlson.distilled.domain.Schedule.class.getName(), jcacheConfiguration);
            cm.createCache(com.therobotcarlson.distilled.domain.Schedule.class.getName() + ".batches", jcacheConfiguration);
            cm.createCache(com.therobotcarlson.distilled.domain.Batch.class.getName(), jcacheConfiguration);
            cm.createCache(com.therobotcarlson.distilled.domain.Batch.class.getName() + ".barrels", jcacheConfiguration);
            cm.createCache(com.therobotcarlson.distilled.domain.ProductionSchedule.class.getName(), jcacheConfiguration);
            cm.createCache(com.therobotcarlson.distilled.domain.GrainForecast.class.getName(), jcacheConfiguration);
            cm.createCache(com.therobotcarlson.distilled.domain.ProductionSummary.class.getName(), jcacheConfiguration);
            cm.createCache(com.therobotcarlson.distilled.domain.YeastSummary.class.getName(), jcacheConfiguration);
            cm.createCache(com.therobotcarlson.distilled.domain.MasterSummary.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}

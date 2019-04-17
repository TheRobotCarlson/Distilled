package com.therobotcarlson.distilled.repository;

import com.therobotcarlson.distilled.domain.GrainForecast;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the GrainForecast entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GrainForecastRepository extends JpaRepository<GrainForecast, Long> {

}

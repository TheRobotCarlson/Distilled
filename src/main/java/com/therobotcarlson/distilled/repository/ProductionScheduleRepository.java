package com.therobotcarlson.distilled.repository;

import com.therobotcarlson.distilled.domain.ProductionSchedule;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ProductionSchedule entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductionScheduleRepository extends JpaRepository<ProductionSchedule, Long> {

}

package com.therobotcarlson.distilled.repository;

import com.therobotcarlson.distilled.domain.ProductionSummary;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ProductionSummary entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductionSummaryRepository extends JpaRepository<ProductionSummary, Long> {

}

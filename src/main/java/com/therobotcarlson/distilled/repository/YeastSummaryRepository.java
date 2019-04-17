package com.therobotcarlson.distilled.repository;

import com.therobotcarlson.distilled.domain.YeastSummary;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the YeastSummary entity.
 */
@SuppressWarnings("unused")
@Repository
public interface YeastSummaryRepository extends JpaRepository<YeastSummary, Long> {

}

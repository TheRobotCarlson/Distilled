package com.therobotcarlson.distilled.repository;

import com.therobotcarlson.distilled.domain.MasterSummary;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MasterSummary entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MasterSummaryRepository extends JpaRepository<MasterSummary, Long> {

}

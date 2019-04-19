package com.therobotcarlson.distilled.repository;

import com.therobotcarlson.distilled.domain.MashbillGrain;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MashbillGrain entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MashbillGrainRepository extends JpaRepository<MashbillGrain, Long> {

}

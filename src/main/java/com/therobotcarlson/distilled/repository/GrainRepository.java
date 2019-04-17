package com.therobotcarlson.distilled.repository;

import com.therobotcarlson.distilled.domain.Grain;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Grain entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GrainRepository extends JpaRepository<Grain, Long> {

}

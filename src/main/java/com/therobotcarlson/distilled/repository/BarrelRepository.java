package com.therobotcarlson.distilled.repository;

import com.therobotcarlson.distilled.domain.Barrel;
import com.therobotcarlson.distilled.domain.Batch;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Barrel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BarrelRepository extends JpaRepository<Barrel, Long> {
    long countBarrelsByBatch(Batch batch);
}

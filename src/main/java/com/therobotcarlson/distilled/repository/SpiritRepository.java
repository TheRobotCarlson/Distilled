package com.therobotcarlson.distilled.repository;

import com.therobotcarlson.distilled.domain.Spirit;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Spirit entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SpiritRepository extends JpaRepository<Spirit, Long> {

}

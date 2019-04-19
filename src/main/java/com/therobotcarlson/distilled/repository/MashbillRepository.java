package com.therobotcarlson.distilled.repository;

import com.therobotcarlson.distilled.domain.Mashbill;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Mashbill entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MashbillRepository extends JpaRepository<Mashbill, Long> {

    @Query(value = "select distinct mashbill from Mashbill mashbill left join fetch mashbill.grainCounts",
        countQuery = "select count(distinct mashbill) from Mashbill mashbill")
    Page<Mashbill> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct mashbill from Mashbill mashbill left join fetch mashbill.grainCounts")
    List<Mashbill> findAllWithEagerRelationships();

    @Query("select mashbill from Mashbill mashbill left join fetch mashbill.grainCounts where mashbill.id =:id")
    Optional<Mashbill> findOneWithEagerRelationships(@Param("id") Long id);

}

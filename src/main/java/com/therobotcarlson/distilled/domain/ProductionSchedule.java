package com.therobotcarlson.distilled.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A ProductionSchedule.
 */
@Entity
@Table(name = "production_schedule")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "productionschedule")
public class ProductionSchedule implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "proof_gallons")
    private Integer proofGallons;

    @Column(name = "actual_barrel_count")
    private Integer actualBarrelCount;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getProofGallons() {
        return proofGallons;
    }

    public ProductionSchedule proofGallons(Integer proofGallons) {
        this.proofGallons = proofGallons;
        return this;
    }

    public void setProofGallons(Integer proofGallons) {
        this.proofGallons = proofGallons;
    }

    public Integer getActualBarrelCount() {
        return actualBarrelCount;
    }

    public ProductionSchedule actualBarrelCount(Integer actualBarrelCount) {
        this.actualBarrelCount = actualBarrelCount;
        return this;
    }

    public void setActualBarrelCount(Integer actualBarrelCount) {
        this.actualBarrelCount = actualBarrelCount;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ProductionSchedule productionSchedule = (ProductionSchedule) o;
        if (productionSchedule.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), productionSchedule.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProductionSchedule{" +
            "id=" + getId() +
            ", proofGallons=" + getProofGallons() +
            ", actualBarrelCount=" + getActualBarrelCount() +
            "}";
    }
}

package com.therobotcarlson.distilled.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Grain.
 */
@Entity
@Table(name = "grain")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "grain")
public class Grain implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "grain_name", nullable = false)
    private String grainName;

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "grain_bushel_weight", nullable = false)
    private Double grainBushelWeight;

    @OneToMany(mappedBy = "grain")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<MashbillGrain> mashbillGrains = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGrainName() {
        return grainName;
    }

    public Grain grainName(String grainName) {
        this.grainName = grainName;
        return this;
    }

    public void setGrainName(String grainName) {
        this.grainName = grainName;
    }

    public Double getGrainBushelWeight() {
        return grainBushelWeight;
    }

    public Grain grainBushelWeight(Double grainBushelWeight) {
        this.grainBushelWeight = grainBushelWeight;
        return this;
    }

    public void setGrainBushelWeight(Double grainBushelWeight) {
        this.grainBushelWeight = grainBushelWeight;
    }

    public Set<MashbillGrain> getMashbillGrains() {
        return mashbillGrains;
    }

    public Grain mashbillGrains(Set<MashbillGrain> mashbillGrains) {
        this.mashbillGrains = mashbillGrains;
        return this;
    }

    public Grain addMashbillGrain(MashbillGrain mashbillGrain) {
        this.mashbillGrains.add(mashbillGrain);
        mashbillGrain.setGrain(this);
        return this;
    }

    public Grain removeMashbillGrain(MashbillGrain mashbillGrain) {
        this.mashbillGrains.remove(mashbillGrain);
        mashbillGrain.setGrain(null);
        return this;
    }

    public void setMashbillGrains(Set<MashbillGrain> mashbillGrains) {
        this.mashbillGrains = mashbillGrains;
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
        Grain grain = (Grain) o;
        if (grain.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), grain.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Grain{" +
            "id=" + getId() +
            ", grainName='" + getGrainName() + "'" +
            ", grainBushelWeight=" + getGrainBushelWeight() +
            "}";
    }
}

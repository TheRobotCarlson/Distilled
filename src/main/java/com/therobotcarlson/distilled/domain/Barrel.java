package com.therobotcarlson.distilled.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Barrel.
 */
@Entity
@Table(name = "barrel")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "barrel")
public class Barrel implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "barreled_date", nullable = false)
    private ZonedDateTime barreledDate;

    @ManyToOne
    @JsonIgnoreProperties("barrels")
    private Warehouse warehouse;

    @ManyToOne
    @JsonIgnoreProperties("barrels")
    private Mashbill mashbill;

    @ManyToOne
    @JsonIgnoreProperties("barrels")
    private Customer customer;

    @ManyToOne
    @JsonIgnoreProperties("barrels")
    private Batch batch;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getBarreledDate() {
        return barreledDate;
    }

    public Barrel barreledDate(ZonedDateTime barreledDate) {
        this.barreledDate = barreledDate;
        return this;
    }

    public void setBarreledDate(ZonedDateTime barreledDate) {
        this.barreledDate = barreledDate;
    }

    public Warehouse getWarehouse() {
        return warehouse;
    }

    public Barrel warehouse(Warehouse warehouse) {
        this.warehouse = warehouse;
        return this;
    }

    public void setWarehouse(Warehouse warehouse) {
        this.warehouse = warehouse;
    }

    public Mashbill getMashbill() {
        return mashbill;
    }

    public Barrel mashbill(Mashbill mashbill) {
        this.mashbill = mashbill;
        return this;
    }

    public void setMashbill(Mashbill mashbill) {
        this.mashbill = mashbill;
    }

    public Customer getCustomer() {
        return customer;
    }

    public Barrel customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Batch getBatch() {
        return batch;
    }

    public Barrel batch(Batch batch) {
        this.batch = batch;
        return this;
    }

    public void setBatch(Batch batch) {
        this.batch = batch;
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
        Barrel barrel = (Barrel) o;
        if (barrel.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), barrel.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Barrel{" +
            "id=" + getId() +
            ", barreledDate='" + getBarreledDate() + "'" +
            "}";
    }
}

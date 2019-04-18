package com.therobotcarlson.distilled.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A MashbillGrain.
 */
@Entity
@Table(name = "mashbill_grain")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "mashbillgrain")
public class MashbillGrain implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @DecimalMin(value = "0")
    @Column(name = "quantity")
    private Double quantity;

    @ManyToOne
    @JsonIgnoreProperties("grains")
    private Grain grain;

    @ManyToOne
    @JsonIgnoreProperties("mashbills")
    private Mashbill mashbill;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getQuantity() {
        return quantity;
    }

    public MashbillGrain quantity(Double quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    public Grain getGrain() {
        return grain;
    }

    public MashbillGrain grain(Grain grain) {
        this.grain = grain;
        return this;
    }

    public void setGrain(Grain grain) {
        this.grain = grain;
    }

    public Mashbill getMashbill() {
        return mashbill;
    }

    public MashbillGrain mashbill(Mashbill mashbill) {
        this.mashbill = mashbill;
        return this;
    }

    public void setMashbill(Mashbill mashbill) {
        this.mashbill = mashbill;
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
        MashbillGrain mashbillGrain = (MashbillGrain) o;
        if (mashbillGrain.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mashbillGrain.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MashbillGrain{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            "}";
    }
}

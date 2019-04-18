package com.therobotcarlson.distilled.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A MashbillYeast.
 */
@Entity
@Table(name = "mashbill_yeast")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "mashbillyeast")
public class MashbillYeast implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @DecimalMin(value = "0")
    @Column(name = "quantity")
    private Double quantity;

    @ManyToOne
    @JsonIgnoreProperties("mashbillYeasts")
    private Yeast yeast;

    @OneToOne(mappedBy = "yeast")
    @JsonIgnore
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

    public MashbillYeast quantity(Double quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    public Yeast getYeast() {
        return yeast;
    }

    public MashbillYeast yeast(Yeast yeast) {
        this.yeast = yeast;
        return this;
    }

    public void setYeast(Yeast yeast) {
        this.yeast = yeast;
    }

    public Mashbill getMashbill() {
        return mashbill;
    }

    public MashbillYeast mashbill(Mashbill mashbill) {
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
        MashbillYeast mashbillYeast = (MashbillYeast) o;
        if (mashbillYeast.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mashbillYeast.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MashbillYeast{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            "}";
    }
}

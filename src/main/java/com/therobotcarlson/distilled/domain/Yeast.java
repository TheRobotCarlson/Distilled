package com.therobotcarlson.distilled.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Yeast.
 */
@Entity
@Table(name = "yeast")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "yeast")
public class Yeast implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "yeast_name", nullable = false)
    private String yeastName;

    @NotNull
    @Column(name = "yeast_code", nullable = false)
    private String yeastCode;

    @NotNull
    @Column(name = "yeast_pallet_num", nullable = false)
    private Integer yeastPalletNum;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getYeastName() {
        return yeastName;
    }

    public Yeast yeastName(String yeastName) {
        this.yeastName = yeastName;
        return this;
    }

    public void setYeastName(String yeastName) {
        this.yeastName = yeastName;
    }

    public String getYeastCode() {
        return yeastCode;
    }

    public Yeast yeastCode(String yeastCode) {
        this.yeastCode = yeastCode;
        return this;
    }

    public void setYeastCode(String yeastCode) {
        this.yeastCode = yeastCode;
    }

    public Integer getYeastPalletNum() {
        return yeastPalletNum;
    }

    public Yeast yeastPalletNum(Integer yeastPalletNum) {
        this.yeastPalletNum = yeastPalletNum;
        return this;
    }

    public void setYeastPalletNum(Integer yeastPalletNum) {
        this.yeastPalletNum = yeastPalletNum;
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
        Yeast yeast = (Yeast) o;
        if (yeast.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), yeast.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Yeast{" +
            "id=" + getId() +
            ", yeastName='" + getYeastName() + "'" +
            ", yeastCode='" + getYeastCode() + "'" +
            ", yeastPalletNum=" + getYeastPalletNum() +
            "}";
    }
}

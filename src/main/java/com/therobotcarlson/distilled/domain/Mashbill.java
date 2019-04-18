package com.therobotcarlson.distilled.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
 * A Mashbill.
 */
@Entity
@Table(name = "mashbill")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "mashbill")
public class Mashbill implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "mashbill_name", nullable = false)
    private String mashbillName;

    @NotNull
    @Column(name = "mashbill_code", nullable = false)
    private String mashbillCode;

    @Column(name = "mashbill_notes")
    private String mashbillNotes;

    @OneToOne
    @JoinColumn(unique = true)
    private MashbillYeast yeast;

    @OneToMany(mappedBy = "mashbill")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<MashbillGrain> mashbillGrains = new HashSet<>();
    @OneToMany(mappedBy = "mashbill")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Barrel> barrels = new HashSet<>();
    @OneToMany(mappedBy = "mashbill")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Schedule> schedules = new HashSet<>();
    @OneToMany(mappedBy = "mashbill")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Batch> batches = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("mashbills")
    private Spirit spirit;

    @ManyToOne
    @JsonIgnoreProperties("customers")
    private Customer customer;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMashbillName() {
        return mashbillName;
    }

    public Mashbill mashbillName(String mashbillName) {
        this.mashbillName = mashbillName;
        return this;
    }

    public void setMashbillName(String mashbillName) {
        this.mashbillName = mashbillName;
    }

    public String getMashbillCode() {
        return mashbillCode;
    }

    public Mashbill mashbillCode(String mashbillCode) {
        this.mashbillCode = mashbillCode;
        return this;
    }

    public void setMashbillCode(String mashbillCode) {
        this.mashbillCode = mashbillCode;
    }

    public String getMashbillNotes() {
        return mashbillNotes;
    }

    public Mashbill mashbillNotes(String mashbillNotes) {
        this.mashbillNotes = mashbillNotes;
        return this;
    }

    public void setMashbillNotes(String mashbillNotes) {
        this.mashbillNotes = mashbillNotes;
    }

    public MashbillYeast getYeast() {
        return yeast;
    }

    public Mashbill yeast(MashbillYeast mashbillYeast) {
        this.yeast = mashbillYeast;
        return this;
    }

    public void setYeast(MashbillYeast mashbillYeast) {
        this.yeast = mashbillYeast;
    }

    public Set<MashbillGrain> getMashbillGrains() {
        return mashbillGrains;
    }

    public Mashbill mashbillGrains(Set<MashbillGrain> mashbillGrains) {
        this.mashbillGrains = mashbillGrains;
        return this;
    }

    public Mashbill addMashbillGrain(MashbillGrain mashbillGrain) {
        this.mashbillGrains.add(mashbillGrain);
        mashbillGrain.setMashbill(this);
        return this;
    }

    public Mashbill removeMashbillGrain(MashbillGrain mashbillGrain) {
        this.mashbillGrains.remove(mashbillGrain);
        mashbillGrain.setMashbill(null);
        return this;
    }

    public void setMashbillGrains(Set<MashbillGrain> mashbillGrains) {
        this.mashbillGrains = mashbillGrains;
    }

    public Set<Barrel> getBarrels() {
        return barrels;
    }

    public Mashbill barrels(Set<Barrel> barrels) {
        this.barrels = barrels;
        return this;
    }

    public Mashbill addBarrel(Barrel barrel) {
        this.barrels.add(barrel);
        barrel.setMashbill(this);
        return this;
    }

    public Mashbill removeBarrel(Barrel barrel) {
        this.barrels.remove(barrel);
        barrel.setMashbill(null);
        return this;
    }

    public void setBarrels(Set<Barrel> barrels) {
        this.barrels = barrels;
    }

    public Set<Schedule> getSchedules() {
        return schedules;
    }

    public Mashbill schedules(Set<Schedule> schedules) {
        this.schedules = schedules;
        return this;
    }

    public Mashbill addSchedule(Schedule schedule) {
        this.schedules.add(schedule);
        schedule.setMashbill(this);
        return this;
    }

    public Mashbill removeSchedule(Schedule schedule) {
        this.schedules.remove(schedule);
        schedule.setMashbill(null);
        return this;
    }

    public void setSchedules(Set<Schedule> schedules) {
        this.schedules = schedules;
    }

    public Set<Batch> getBatches() {
        return batches;
    }

    public Mashbill batches(Set<Batch> batches) {
        this.batches = batches;
        return this;
    }

    public Mashbill addBatch(Batch batch) {
        this.batches.add(batch);
        batch.setMashbill(this);
        return this;
    }

    public Mashbill removeBatch(Batch batch) {
        this.batches.remove(batch);
        batch.setMashbill(null);
        return this;
    }

    public void setBatches(Set<Batch> batches) {
        this.batches = batches;
    }

    public Spirit getSpirit() {
        return spirit;
    }

    public Mashbill spirit(Spirit spirit) {
        this.spirit = spirit;
        return this;
    }

    public void setSpirit(Spirit spirit) {
        this.spirit = spirit;
    }

    public Customer getCustomer() {
        return customer;
    }

    public Mashbill customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
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
        Mashbill mashbill = (Mashbill) o;
        if (mashbill.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mashbill.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Mashbill{" +
            "id=" + getId() +
            ", mashbillName='" + getMashbillName() + "'" +
            ", mashbillCode='" + getMashbillCode() + "'" +
            ", mashbillNotes='" + getMashbillNotes() + "'" +
            "}";
    }
}

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
 * A Customer.
 */
@Entity
@Table(name = "customer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "customer")
public class Customer implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "customer_name", nullable = false)
    private String customerName;

    @NotNull
    @Column(name = "customer_code", nullable = false)
    private String customerCode;

    @OneToMany(mappedBy = "customer")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Mashbill> mashbills = new HashSet<>();
    @OneToMany(mappedBy = "customer")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Barrel> barrels = new HashSet<>();
    @OneToMany(mappedBy = "customer")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Schedule> schedules = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public Customer customerName(String customerName) {
        this.customerName = customerName;
        return this;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerCode() {
        return customerCode;
    }

    public Customer customerCode(String customerCode) {
        this.customerCode = customerCode;
        return this;
    }

    public void setCustomerCode(String customerCode) {
        this.customerCode = customerCode;
    }

    public Set<Mashbill> getMashbills() {
        return mashbills;
    }

    public Customer mashbills(Set<Mashbill> mashbills) {
        this.mashbills = mashbills;
        return this;
    }

    public Customer addMashbill(Mashbill mashbill) {
        this.mashbills.add(mashbill);
        mashbill.setCustomer(this);
        return this;
    }

    public Customer removeMashbill(Mashbill mashbill) {
        this.mashbills.remove(mashbill);
        mashbill.setCustomer(null);
        return this;
    }

    public void setMashbills(Set<Mashbill> mashbills) {
        this.mashbills = mashbills;
    }

    public Set<Barrel> getBarrels() {
        return barrels;
    }

    public Customer barrels(Set<Barrel> barrels) {
        this.barrels = barrels;
        return this;
    }

    public Customer addBarrel(Barrel barrel) {
        this.barrels.add(barrel);
        barrel.setCustomer(this);
        return this;
    }

    public Customer removeBarrel(Barrel barrel) {
        this.barrels.remove(barrel);
        barrel.setCustomer(null);
        return this;
    }

    public void setBarrels(Set<Barrel> barrels) {
        this.barrels = barrels;
    }

    public Set<Schedule> getSchedules() {
        return schedules;
    }

    public Customer schedules(Set<Schedule> schedules) {
        this.schedules = schedules;
        return this;
    }

    public Customer addSchedule(Schedule schedule) {
        this.schedules.add(schedule);
        schedule.setCustomer(this);
        return this;
    }

    public Customer removeSchedule(Schedule schedule) {
        this.schedules.remove(schedule);
        schedule.setCustomer(null);
        return this;
    }

    public void setSchedules(Set<Schedule> schedules) {
        this.schedules = schedules;
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
        Customer customer = (Customer) o;
        if (customer.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Customer{" +
            "id=" + getId() +
            ", customerName='" + getCustomerName() + "'" +
            ", customerCode='" + getCustomerCode() + "'" +
            "}";
    }
}

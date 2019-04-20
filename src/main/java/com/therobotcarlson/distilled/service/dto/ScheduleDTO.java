package com.therobotcarlson.distilled.service.dto;
import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Schedule entity.
 */
public class ScheduleDTO implements Serializable {

    private Long id;

    private ZonedDateTime targetDate;

    @NotNull
    private Integer barrelCount;

    @NotNull
    private Integer targetProof;

    private String notes;


    private Long mashbillId;

    private String mashbillMashbillCode;

    private Long customerId;

    private String customerCustomerCode;

    private Long warehouseId;

    private String warehouseWarehouseCode;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getTargetDate() {
        return targetDate;
    }

    public void setTargetDate(ZonedDateTime targetDate) {
        this.targetDate = targetDate;
    }

    public Integer getBarrelCount() {
        return barrelCount;
    }

    public void setBarrelCount(Integer barrelCount) {
        this.barrelCount = barrelCount;
    }

    public Integer getTargetProof() {
        return targetProof;
    }

    public void setTargetProof(Integer targetProof) {
        this.targetProof = targetProof;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Long getMashbillId() {
        return mashbillId;
    }

    public void setMashbillId(Long mashbillId) {
        this.mashbillId = mashbillId;
    }

    public String getMashbillMashbillCode() {
        return mashbillMashbillCode;
    }

    public void setMashbillMashbillCode(String mashbillMashbillCode) {
        this.mashbillMashbillCode = mashbillMashbillCode;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public String getCustomerCustomerCode() {
        return customerCustomerCode;
    }

    public void setCustomerCustomerCode(String customerCustomerCode) {
        this.customerCustomerCode = customerCustomerCode;
    }

    public Long getWarehouseId() {
        return warehouseId;
    }

    public void setWarehouseId(Long warehouseId) {
        this.warehouseId = warehouseId;
    }

    public String getWarehouseWarehouseCode() {
        return warehouseWarehouseCode;
    }

    public void setWarehouseWarehouseCode(String warehouseWarehouseCode) {
        this.warehouseWarehouseCode = warehouseWarehouseCode;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ScheduleDTO scheduleDTO = (ScheduleDTO) o;
        if (scheduleDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), scheduleDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ScheduleDTO{" +
            "id=" + getId() +
            ", targetDate='" + getTargetDate() + "'" +
            ", barrelCount=" + getBarrelCount() +
            ", targetProof=" + getTargetProof() +
            ", notes='" + getNotes() + "'" +
            ", mashbill=" + getMashbillId() +
            ", mashbill='" + getMashbillMashbillCode() + "'" +
            ", customer=" + getCustomerId() +
            ", customer='" + getCustomerCustomerCode() + "'" +
            ", warehouse=" + getWarehouseId() +
            ", warehouse='" + getWarehouseWarehouseCode() + "'" +
            "}";
    }
}

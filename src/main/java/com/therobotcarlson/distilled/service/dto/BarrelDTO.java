package com.therobotcarlson.distilled.service.dto;
import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Barrel entity.
 */
public class BarrelDTO implements Serializable {

    private Long id;

    @NotNull
    private Integer proof;

    @NotNull
    private ZonedDateTime barreledDate;

    @NotNull
    private String orderCode;


    private Long warehouseId;

    private String warehouseWarehouseCode;

    private Long mashbillId;

    private String mashbillMashbillCode;

    private Long orderId;

    private String orderOrderCode;

    private Long customerId;

    private String customerCustomerCode;

    private Long batchId;

    private String batchBatchNumber;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getProof() {
        return proof;
    }

    public void setProof(Integer proof) {
        this.proof = proof;
    }

    public ZonedDateTime getBarreledDate() {
        return barreledDate;
    }

    public void setBarreledDate(ZonedDateTime barreledDate) {
        this.barreledDate = barreledDate;
    }

    public String getOrderCode() {
        return orderCode;
    }

    public void setOrderCode(String orderCode) {
        this.orderCode = orderCode;
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

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long scheduleId) {
        this.orderId = scheduleId;
    }

    public String getOrderOrderCode() {
        return orderOrderCode;
    }

    public void setOrderOrderCode(String scheduleOrderCode) {
        this.orderOrderCode = scheduleOrderCode;
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

    public Long getBatchId() {
        return batchId;
    }

    public void setBatchId(Long batchId) {
        this.batchId = batchId;
    }

    public String getBatchBatchNumber() {
        return batchBatchNumber;
    }

    public void setBatchBatchNumber(String batchBatchNumber) {
        this.batchBatchNumber = batchBatchNumber;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        BarrelDTO barrelDTO = (BarrelDTO) o;
        if (barrelDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), barrelDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BarrelDTO{" +
            "id=" + getId() +
            ", proof=" + getProof() +
            ", barreledDate='" + getBarreledDate() + "'" +
            ", orderCode='" + getOrderCode() + "'" +
            ", warehouse=" + getWarehouseId() +
            ", warehouse='" + getWarehouseWarehouseCode() + "'" +
            ", mashbill=" + getMashbillId() +
            ", mashbill='" + getMashbillMashbillCode() + "'" +
            ", order=" + getOrderId() +
            ", order='" + getOrderOrderCode() + "'" +
            ", customer=" + getCustomerId() +
            ", customer='" + getCustomerCustomerCode() + "'" +
            ", batch=" + getBatchId() +
            ", batch='" + getBatchBatchNumber() + "'" +
            "}";
    }
}

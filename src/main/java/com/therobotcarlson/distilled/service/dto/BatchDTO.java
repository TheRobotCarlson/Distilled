package com.therobotcarlson.distilled.service.dto;
import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Batch entity.
 */
public class BatchDTO implements Serializable {

    private Long id;

    @NotNull
    private Integer proof;

    @NotNull
    private ZonedDateTime date;

    @NotNull
    private String orderCode;


    private Long warehouseId;

    private String warehouseWarehouseCode;

    private Long scheduleId;

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

    public ZonedDateTime getDate() {
        return date;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
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

    public Long getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(Long scheduleId) {
        this.scheduleId = scheduleId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        BatchDTO batchDTO = (BatchDTO) o;
        if (batchDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), batchDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BatchDTO{" +
            "id=" + getId() +
            ", proof=" + getProof() +
            ", date='" + getDate() + "'" +
            ", orderCode='" + getOrderCode() + "'" +
            ", warehouse=" + getWarehouseId() +
            ", warehouse='" + getWarehouseWarehouseCode() + "'" +
            ", schedule=" + getScheduleId() +
            "}";
    }
}

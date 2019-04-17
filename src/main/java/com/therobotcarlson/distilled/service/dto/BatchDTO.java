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
    private String batchNumber;


    private Long scheduleId;

    private String scheduleOrderCode;

    private Long mashbillId;

    private String mashbillMashbillCode;

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

    public String getBatchNumber() {
        return batchNumber;
    }

    public void setBatchNumber(String batchNumber) {
        this.batchNumber = batchNumber;
    }

    public Long getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(Long scheduleId) {
        this.scheduleId = scheduleId;
    }

    public String getScheduleOrderCode() {
        return scheduleOrderCode;
    }

    public void setScheduleOrderCode(String scheduleOrderCode) {
        this.scheduleOrderCode = scheduleOrderCode;
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
            ", batchNumber='" + getBatchNumber() + "'" +
            ", schedule=" + getScheduleId() +
            ", schedule='" + getScheduleOrderCode() + "'" +
            ", mashbill=" + getMashbillId() +
            ", mashbill='" + getMashbillMashbillCode() + "'" +
            "}";
    }
}

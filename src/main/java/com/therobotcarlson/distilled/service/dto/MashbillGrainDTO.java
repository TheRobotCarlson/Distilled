package com.therobotcarlson.distilled.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the MashbillGrain entity.
 */
public class MashbillGrainDTO implements Serializable {

    private Long id;

    @DecimalMin(value = "0")
    private Double quantity;


    private Long grainId;

    private String grainGrainName;

    private Long mashbillId;

    private String mashbillMashbillCode;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    public Long getGrainId() {
        return grainId;
    }

    public void setGrainId(Long grainId) {
        this.grainId = grainId;
    }

    public String getGrainGrainName() {
        return grainGrainName;
    }

    public void setGrainGrainName(String grainGrainName) {
        this.grainGrainName = grainGrainName;
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

        MashbillGrainDTO mashbillGrainDTO = (MashbillGrainDTO) o;
        if (mashbillGrainDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mashbillGrainDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MashbillGrainDTO{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            ", grain=" + getGrainId() +
            ", grain='" + getGrainGrainName() + "'" +
            ", mashbill=" + getMashbillId() +
            ", mashbill='" + getMashbillMashbillCode() + "'" +
            "}";
    }
}

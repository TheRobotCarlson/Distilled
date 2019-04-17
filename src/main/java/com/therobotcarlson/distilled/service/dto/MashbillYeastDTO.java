package com.therobotcarlson.distilled.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the MashbillYeast entity.
 */
public class MashbillYeastDTO implements Serializable {

    private Long id;

    @DecimalMin(value = "0")
    private Double quantity;


    private Long yeastId;

    private String yeastYeastCode;

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

    public Long getYeastId() {
        return yeastId;
    }

    public void setYeastId(Long yeastId) {
        this.yeastId = yeastId;
    }

    public String getYeastYeastCode() {
        return yeastYeastCode;
    }

    public void setYeastYeastCode(String yeastYeastCode) {
        this.yeastYeastCode = yeastYeastCode;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        MashbillYeastDTO mashbillYeastDTO = (MashbillYeastDTO) o;
        if (mashbillYeastDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mashbillYeastDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MashbillYeastDTO{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            ", yeast=" + getYeastId() +
            ", yeast='" + getYeastYeastCode() + "'" +
            "}";
    }
}

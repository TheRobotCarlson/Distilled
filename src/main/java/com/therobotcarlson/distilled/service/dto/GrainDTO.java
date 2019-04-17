package com.therobotcarlson.distilled.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Grain entity.
 */
public class GrainDTO implements Serializable {

    private Long id;

    @NotNull
    private String grainName;

    @NotNull
    @DecimalMin(value = "0")
    private Double grainBushelWeight;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGrainName() {
        return grainName;
    }

    public void setGrainName(String grainName) {
        this.grainName = grainName;
    }

    public Double getGrainBushelWeight() {
        return grainBushelWeight;
    }

    public void setGrainBushelWeight(Double grainBushelWeight) {
        this.grainBushelWeight = grainBushelWeight;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        GrainDTO grainDTO = (GrainDTO) o;
        if (grainDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), grainDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GrainDTO{" +
            "id=" + getId() +
            ", grainName='" + getGrainName() + "'" +
            ", grainBushelWeight=" + getGrainBushelWeight() +
            "}";
    }
}

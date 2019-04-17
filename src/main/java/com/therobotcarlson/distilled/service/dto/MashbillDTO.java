package com.therobotcarlson.distilled.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Mashbill entity.
 */
public class MashbillDTO implements Serializable {

    private Long id;

    @NotNull
    private String mashbillName;

    @NotNull
    private String mashbillCode;

    private String mashbillNotes;


    private Long yeastId;

    private Long spiritId;

    private String spiritCode;

    private Long customerId;

    private String customerCustomerName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMashbillName() {
        return mashbillName;
    }

    public void setMashbillName(String mashbillName) {
        this.mashbillName = mashbillName;
    }

    public String getMashbillCode() {
        return mashbillCode;
    }

    public void setMashbillCode(String mashbillCode) {
        this.mashbillCode = mashbillCode;
    }

    public String getMashbillNotes() {
        return mashbillNotes;
    }

    public void setMashbillNotes(String mashbillNotes) {
        this.mashbillNotes = mashbillNotes;
    }

    public Long getYeastId() {
        return yeastId;
    }

    public void setYeastId(Long mashbillYeastId) {
        this.yeastId = mashbillYeastId;
    }

    public Long getSpiritId() {
        return spiritId;
    }

    public void setSpiritId(Long spiritId) {
        this.spiritId = spiritId;
    }

    public String getSpiritCode() {
        return spiritCode;
    }

    public void setSpiritCode(String spiritCode) {
        this.spiritCode = spiritCode;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public String getCustomerCustomerName() {
        return customerCustomerName;
    }

    public void setCustomerCustomerName(String customerCustomerName) {
        this.customerCustomerName = customerCustomerName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        MashbillDTO mashbillDTO = (MashbillDTO) o;
        if (mashbillDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mashbillDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MashbillDTO{" +
            "id=" + getId() +
            ", mashbillName='" + getMashbillName() + "'" +
            ", mashbillCode='" + getMashbillCode() + "'" +
            ", mashbillNotes='" + getMashbillNotes() + "'" +
            ", yeast=" + getYeastId() +
            ", spirit=" + getSpiritId() +
            ", spirit='" + getSpiritCode() + "'" +
            ", customer=" + getCustomerId() +
            ", customer='" + getCustomerCustomerName() + "'" +
            "}";
    }
}

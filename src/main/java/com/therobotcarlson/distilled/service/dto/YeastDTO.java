package com.therobotcarlson.distilled.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Yeast entity.
 */
public class YeastDTO implements Serializable {

    private Long id;

    @NotNull
    private String yeastName;

    @NotNull
    private String yeastCode;

    @NotNull
    private Integer yeastPalletNum;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getYeastName() {
        return yeastName;
    }

    public void setYeastName(String yeastName) {
        this.yeastName = yeastName;
    }

    public String getYeastCode() {
        return yeastCode;
    }

    public void setYeastCode(String yeastCode) {
        this.yeastCode = yeastCode;
    }

    public Integer getYeastPalletNum() {
        return yeastPalletNum;
    }

    public void setYeastPalletNum(Integer yeastPalletNum) {
        this.yeastPalletNum = yeastPalletNum;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        YeastDTO yeastDTO = (YeastDTO) o;
        if (yeastDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), yeastDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "YeastDTO{" +
            "id=" + getId() +
            ", yeastName='" + getYeastName() + "'" +
            ", yeastCode='" + getYeastCode() + "'" +
            ", yeastPalletNum=" + getYeastPalletNum() +
            "}";
    }
}

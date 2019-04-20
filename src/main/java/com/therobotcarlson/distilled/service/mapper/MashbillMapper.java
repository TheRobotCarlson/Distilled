package com.therobotcarlson.distilled.service.mapper;

import com.therobotcarlson.distilled.domain.*;
import com.therobotcarlson.distilled.service.dto.MashbillDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Mashbill and its DTO MashbillDTO.
 */
@Mapper(componentModel = "spring", uses = {YeastMapper.class, SpiritMapper.class, MashbillGrainMapper.class, CustomerMapper.class})
public interface MashbillMapper extends EntityMapper<MashbillDTO, Mashbill> {

    @Mapping(source = "yeast.id", target = "yeastId")
    @Mapping(source = "yeast.yeastCode", target = "yeastYeastCode")
    @Mapping(source = "spirit.id", target = "spiritId")
    @Mapping(source = "spirit.name", target = "spiritName")
    @Mapping(source = "customer.id", target = "customerId")
    @Mapping(source = "customer.customerName", target = "customerCustomerName")
    MashbillDTO toDto(Mashbill mashbill);

    @Mapping(source = "yeastId", target = "yeast")
    @Mapping(target = "barrels", ignore = true)
    @Mapping(target = "schedules", ignore = true)
    @Mapping(source = "spiritId", target = "spirit")
    @Mapping(source = "customerId", target = "customer")
    Mashbill toEntity(MashbillDTO mashbillDTO);

    default Mashbill fromId(Long id) {
        if (id == null) {
            return null;
        }
        Mashbill mashbill = new Mashbill();
        mashbill.setId(id);
        return mashbill;
    }
}

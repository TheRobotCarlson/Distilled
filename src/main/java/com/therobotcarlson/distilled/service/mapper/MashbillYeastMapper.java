package com.therobotcarlson.distilled.service.mapper;

import com.therobotcarlson.distilled.domain.*;
import com.therobotcarlson.distilled.service.dto.MashbillYeastDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity MashbillYeast and its DTO MashbillYeastDTO.
 */
@Mapper(componentModel = "spring", uses = {YeastMapper.class})
public interface MashbillYeastMapper extends EntityMapper<MashbillYeastDTO, MashbillYeast> {

    @Mapping(source = "yeast.id", target = "yeastId")
    @Mapping(source = "yeast.yeastCode", target = "yeastYeastCode")
    MashbillYeastDTO toDto(MashbillYeast mashbillYeast);

    @Mapping(target = "mashbill", ignore = true)
    @Mapping(source = "yeastId", target = "yeast")
    MashbillYeast toEntity(MashbillYeastDTO mashbillYeastDTO);

    default MashbillYeast fromId(Long id) {
        if (id == null) {
            return null;
        }
        MashbillYeast mashbillYeast = new MashbillYeast();
        mashbillYeast.setId(id);
        return mashbillYeast;
    }
}

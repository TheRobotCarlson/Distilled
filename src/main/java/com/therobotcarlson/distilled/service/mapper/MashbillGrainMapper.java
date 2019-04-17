package com.therobotcarlson.distilled.service.mapper;

import com.therobotcarlson.distilled.domain.*;
import com.therobotcarlson.distilled.service.dto.MashbillGrainDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity MashbillGrain and its DTO MashbillGrainDTO.
 */
@Mapper(componentModel = "spring", uses = {GrainMapper.class, MashbillMapper.class})
public interface MashbillGrainMapper extends EntityMapper<MashbillGrainDTO, MashbillGrain> {

    @Mapping(source = "grain.id", target = "grainId")
    @Mapping(source = "grain.grainName", target = "grainGrainName")
    @Mapping(source = "mashbill.id", target = "mashbillId")
    @Mapping(source = "mashbill.mashbillCode", target = "mashbillMashbillCode")
    MashbillGrainDTO toDto(MashbillGrain mashbillGrain);

    @Mapping(source = "grainId", target = "grain")
    @Mapping(source = "mashbillId", target = "mashbill")
    MashbillGrain toEntity(MashbillGrainDTO mashbillGrainDTO);

    default MashbillGrain fromId(Long id) {
        if (id == null) {
            return null;
        }
        MashbillGrain mashbillGrain = new MashbillGrain();
        mashbillGrain.setId(id);
        return mashbillGrain;
    }
}

package com.therobotcarlson.distilled.service.mapper;

import com.therobotcarlson.distilled.domain.*;
import com.therobotcarlson.distilled.service.dto.GrainDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Grain and its DTO GrainDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface GrainMapper extends EntityMapper<GrainDTO, Grain> {


    @Mapping(target = "mashbillGrains", ignore = true)
    Grain toEntity(GrainDTO grainDTO);

    default Grain fromId(Long id) {
        if (id == null) {
            return null;
        }
        Grain grain = new Grain();
        grain.setId(id);
        return grain;
    }
}

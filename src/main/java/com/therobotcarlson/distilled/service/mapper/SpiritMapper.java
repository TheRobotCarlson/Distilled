package com.therobotcarlson.distilled.service.mapper;

import com.therobotcarlson.distilled.domain.*;
import com.therobotcarlson.distilled.service.dto.SpiritDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Spirit and its DTO SpiritDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SpiritMapper extends EntityMapper<SpiritDTO, Spirit> {



    default Spirit fromId(Long id) {
        if (id == null) {
            return null;
        }
        Spirit spirit = new Spirit();
        spirit.setId(id);
        return spirit;
    }
}

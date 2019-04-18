package com.therobotcarlson.distilled.service.mapper;

import com.therobotcarlson.distilled.domain.*;
import com.therobotcarlson.distilled.service.dto.YeastDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Yeast and its DTO YeastDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface YeastMapper extends EntityMapper<YeastDTO, Yeast> {



    default Yeast fromId(Long id) {
        if (id == null) {
            return null;
        }
        Yeast yeast = new Yeast();
        yeast.setId(id);
        return yeast;
    }
}

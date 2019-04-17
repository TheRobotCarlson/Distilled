package com.therobotcarlson.distilled.service.mapper;

import com.therobotcarlson.distilled.domain.*;
import com.therobotcarlson.distilled.service.dto.BatchDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Batch and its DTO BatchDTO.
 */
@Mapper(componentModel = "spring", uses = {ScheduleMapper.class, MashbillMapper.class})
public interface BatchMapper extends EntityMapper<BatchDTO, Batch> {

    @Mapping(source = "schedule.id", target = "scheduleId")
    @Mapping(source = "schedule.orderCode", target = "scheduleOrderCode")
    @Mapping(source = "mashbill.id", target = "mashbillId")
    @Mapping(source = "mashbill.mashbillCode", target = "mashbillMashbillCode")
    BatchDTO toDto(Batch batch);

    @Mapping(target = "barrels", ignore = true)
    @Mapping(source = "scheduleId", target = "schedule")
    @Mapping(source = "mashbillId", target = "mashbill")
    Batch toEntity(BatchDTO batchDTO);

    default Batch fromId(Long id) {
        if (id == null) {
            return null;
        }
        Batch batch = new Batch();
        batch.setId(id);
        return batch;
    }
}

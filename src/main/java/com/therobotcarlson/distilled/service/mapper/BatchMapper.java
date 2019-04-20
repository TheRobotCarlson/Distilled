package com.therobotcarlson.distilled.service.mapper;

import com.therobotcarlson.distilled.domain.*;
import com.therobotcarlson.distilled.service.dto.BatchDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Batch and its DTO BatchDTO.
 */
@Mapper(componentModel = "spring", uses = {WarehouseMapper.class, ScheduleMapper.class})
public interface BatchMapper extends EntityMapper<BatchDTO, Batch> {

    @Mapping(source = "warehouse.id", target = "warehouseId")
    @Mapping(source = "warehouse.warehouseCode", target = "warehouseWarehouseCode")
    @Mapping(source = "schedule.id", target = "scheduleId")
    BatchDTO toDto(Batch batch);

    @Mapping(target = "barrels", ignore = true)
    @Mapping(source = "warehouseId", target = "warehouse")
    @Mapping(source = "scheduleId", target = "schedule")
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

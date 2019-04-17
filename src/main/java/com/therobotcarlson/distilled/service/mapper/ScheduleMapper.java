package com.therobotcarlson.distilled.service.mapper;

import com.therobotcarlson.distilled.domain.*;
import com.therobotcarlson.distilled.service.dto.ScheduleDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Schedule and its DTO ScheduleDTO.
 */
@Mapper(componentModel = "spring", uses = {MashbillMapper.class, CustomerMapper.class, WarehouseMapper.class})
public interface ScheduleMapper extends EntityMapper<ScheduleDTO, Schedule> {

    @Mapping(source = "mashbill.id", target = "mashbillId")
    @Mapping(source = "mashbill.mashbillCode", target = "mashbillMashbillCode")
    @Mapping(source = "customer.id", target = "customerId")
    @Mapping(source = "customer.customerCode", target = "customerCustomerCode")
    @Mapping(source = "warehouse.id", target = "warehouseId")
    @Mapping(source = "warehouse.warehouseCode", target = "warehouseWarehouseCode")
    ScheduleDTO toDto(Schedule schedule);

    @Mapping(target = "barrels", ignore = true)
    @Mapping(target = "batches", ignore = true)
    @Mapping(source = "mashbillId", target = "mashbill")
    @Mapping(source = "customerId", target = "customer")
    @Mapping(source = "warehouseId", target = "warehouse")
    Schedule toEntity(ScheduleDTO scheduleDTO);

    default Schedule fromId(Long id) {
        if (id == null) {
            return null;
        }
        Schedule schedule = new Schedule();
        schedule.setId(id);
        return schedule;
    }
}

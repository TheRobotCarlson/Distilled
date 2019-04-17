package com.therobotcarlson.distilled.service.mapper;

import com.therobotcarlson.distilled.domain.*;
import com.therobotcarlson.distilled.service.dto.BarrelDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Barrel and its DTO BarrelDTO.
 */
@Mapper(componentModel = "spring", uses = {WarehouseMapper.class, MashbillMapper.class, ScheduleMapper.class, CustomerMapper.class, BatchMapper.class})
public interface BarrelMapper extends EntityMapper<BarrelDTO, Barrel> {

    @Mapping(source = "warehouse.id", target = "warehouseId")
    @Mapping(source = "warehouse.warehouseCode", target = "warehouseWarehouseCode")
    @Mapping(source = "mashbill.id", target = "mashbillId")
    @Mapping(source = "mashbill.mashbillCode", target = "mashbillMashbillCode")
    @Mapping(source = "order.id", target = "orderId")
    @Mapping(source = "order.orderCode", target = "orderOrderCode")
    @Mapping(source = "customer.id", target = "customerId")
    @Mapping(source = "customer.customerCode", target = "customerCustomerCode")
    @Mapping(source = "batch.id", target = "batchId")
    @Mapping(source = "batch.batchNumber", target = "batchBatchNumber")
    BarrelDTO toDto(Barrel barrel);

    @Mapping(source = "warehouseId", target = "warehouse")
    @Mapping(source = "mashbillId", target = "mashbill")
    @Mapping(source = "orderId", target = "order")
    @Mapping(source = "customerId", target = "customer")
    @Mapping(source = "batchId", target = "batch")
    Barrel toEntity(BarrelDTO barrelDTO);

    default Barrel fromId(Long id) {
        if (id == null) {
            return null;
        }
        Barrel barrel = new Barrel();
        barrel.setId(id);
        return barrel;
    }
}

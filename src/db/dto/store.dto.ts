import 'reflect-metadata'
import { Type } from 'class-transformer';
import { BaseDto, BaseDtoGroup, BasePagingDto } from './common.dto';
import { IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString, Min, MinLength, ValidateNested } from 'class-validator';

export class StoreDtoGroup extends BaseDtoGroup {
}

class LocationDto {
  @IsOptional({
    groups: [StoreDtoGroup.UPDATE, StoreDtoGroup.CREATE]
  })
  @IsString({
    groups: [StoreDtoGroup.CREATE, StoreDtoGroup.UPDATE]
  })
  langtd: string;

  @IsOptional({
    groups: [StoreDtoGroup.UPDATE, StoreDtoGroup.CREATE]
  })
  @IsString({
    groups: [StoreDtoGroup.CREATE, StoreDtoGroup.UPDATE]
  })
  longtd: string;
}

class DeliveryPriceDto {
  @IsOptional({
    groups: [StoreDtoGroup.UPDATE, StoreDtoGroup.CREATE]
  })
  @IsNotEmpty({
    groups: [StoreDtoGroup.CREATE, StoreDtoGroup.UPDATE]
  })
  min: number;

  @IsOptional({
    groups: [StoreDtoGroup.UPDATE, StoreDtoGroup.CREATE]
  })
  @IsNotEmpty({
    groups: [StoreDtoGroup.CREATE, StoreDtoGroup.UPDATE]
  })
  max: number;
}

class WorkingTimeDto {
  @IsOptional({
    groups: [StoreDtoGroup.UPDATE, StoreDtoGroup.CREATE]
  })
  @IsString({
    groups: [StoreDtoGroup.CREATE, StoreDtoGroup.UPDATE]
  })
  start: string;

  @IsOptional({
    groups: [StoreDtoGroup.UPDATE, StoreDtoGroup.CREATE]
  })
  @IsString({
    groups: [StoreDtoGroup.CREATE, StoreDtoGroup.UPDATE]
  })
  end: string;
}

class DeliveryTimeRangeDto {
  @IsOptional({
    groups: [StoreDtoGroup.UPDATE, StoreDtoGroup.CREATE]
  })
  @IsString({
    groups: [StoreDtoGroup.CREATE, StoreDtoGroup.UPDATE]
  })
  min: string;

  @IsOptional({
    groups: [StoreDtoGroup.UPDATE, StoreDtoGroup.CREATE]
  })
  @IsString({
    groups: [StoreDtoGroup.CREATE, StoreDtoGroup.UPDATE]
  })
  max: string;
}




export class StoreDto extends BaseDto {

  @IsOptional({ groups: [StoreDtoGroup.CREATE, StoreDtoGroup.UPDATE] })
  @IsString({ groups: [StoreDtoGroup.CREATE, StoreDtoGroup.UPDATE] })
  title: string;

  @IsOptional({ groups: [StoreDtoGroup.CREATE, StoreDtoGroup.UPDATE] })
  @IsString({ groups: [StoreDtoGroup.CREATE, StoreDtoGroup.UPDATE] })
  image: string;

  @IsOptional({ groups: [StoreDtoGroup.CREATE, StoreDtoGroup.UPDATE] })
  @IsNotEmpty({ groups: [StoreDtoGroup.CREATE, StoreDtoGroup.UPDATE] })
  branchId: number;

  @IsOptional({ groups: [StoreDtoGroup.CREATE, StoreDtoGroup.UPDATE] })
  @ValidateNested({ groups: [StoreDtoGroup.CREATE, StoreDtoGroup.UPDATE] })
  @Type(() => LocationDto)
  location: LocationDto;

  @IsOptional({ groups: [StoreDtoGroup.CREATE, StoreDtoGroup.UPDATE] })
  @ValidateNested({ groups: [StoreDtoGroup.CREATE, StoreDtoGroup.UPDATE] })
  @Type(() => DeliveryPriceDto)
  deliveryPrice: DeliveryPriceDto;

  @IsOptional({ groups: [StoreDtoGroup.CREATE, StoreDtoGroup.UPDATE] })
  @ValidateNested({ groups: [StoreDtoGroup.CREATE, StoreDtoGroup.UPDATE] })
  @Type(() => DeliveryTimeRangeDto)
  deliveryTimeRange: DeliveryTimeRangeDto;

  @IsOptional({ groups: [StoreDtoGroup.CREATE, StoreDtoGroup.UPDATE] })
  @ValidateNested({ groups: [StoreDtoGroup.CREATE, StoreDtoGroup.UPDATE] })
  @Type(() => WorkingTimeDto)
  workingTime: WorkingTimeDto;

  @IsOptional({
    groups: [StoreDtoGroup.UPDATE]
  })
  @IsMongoId({
    groups: [StoreDtoGroup.CREATE, StoreDtoGroup.UPDATE]
  })
  categoryId: string;

  @IsOptional({ groups: [StoreDtoGroup.UPDATE] })
  @IsString({
    groups: [StoreDtoGroup.UPDATE],
    each: true
  })
  tags: string[];
}

export class StoreGetDto extends BasePagingDto {

  @IsOptional({
    groups: [StoreDtoGroup.GET_PAGING]
  })
  @IsMongoId({
    groups: [StoreDtoGroup.GET_PAGING]
  })
  categoryId?: string;
}



import 'reflect-metadata'
import { Type } from 'class-transformer';
import { BaseDto, BaseDtoGroup, BasePagingDto } from './common.dto';
import { IsBoolean, IsMongoId, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class MenuDtoGroup extends BaseDtoGroup {
}

export class MenuDto extends BaseDto {
  @IsOptional({
    groups: [MenuDtoGroup.UPDATE]
  })
  @IsString({
    groups: [MenuDtoGroup.CREATE, MenuDtoGroup.UPDATE]
  })
  title: string;

  @IsOptional({
    groups: [MenuDtoGroup.UPDATE]
  })
  @IsString({
    groups: [MenuDtoGroup.CREATE, MenuDtoGroup.UPDATE]
  })
  image: string;

  @IsOptional({ groups: [MenuDtoGroup.CREATE, MenuDtoGroup.UPDATE] })
  @IsMongoId({ groups: [MenuDtoGroup.CREATE, MenuDtoGroup.UPDATE] })
  storeId?: string;

  createdBy: any;
}

export class MenuGetDto extends BasePagingDto {
  @IsOptional({
    groups: [MenuDtoGroup.GET_PAGING]
  })
  @IsMongoId({
    groups: [MenuDtoGroup.GET_PAGING]
  })
  storeId?: string;
}



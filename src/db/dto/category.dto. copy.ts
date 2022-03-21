import 'reflect-metadata'
import { Type } from 'class-transformer';
import { BaseDto, BaseDtoGroup, BasePagingDto } from './common.dto';
import { IsBoolean, IsMongoId, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class CategoryDtoGroup extends BaseDtoGroup {
}

export class CategoryDto extends BaseDto {
  @IsOptional({
    groups: [CategoryDtoGroup.UPDATE]
  })
  @IsString({
    groups: [CategoryDtoGroup.CREATE, CategoryDtoGroup.UPDATE]
  })
  title: string;

  @IsOptional({
    groups: [CategoryDtoGroup.UPDATE]
  })
  @IsString({
    groups: [CategoryDtoGroup.CREATE, CategoryDtoGroup.UPDATE]
  })
  image: string;

  @IsOptional({ groups: [CategoryDtoGroup.CREATE, CategoryDtoGroup.UPDATE] })
  @IsMongoId({ groups: [CategoryDtoGroup.CREATE, CategoryDtoGroup.UPDATE] })
  parentId?: string;

  @IsBoolean({
    groups: [CategoryDtoGroup.CREATE, CategoryDtoGroup.UPDATE]
  })
  isParent: boolean = false

  @IsBoolean({
    groups: [CategoryDtoGroup.CREATE, CategoryDtoGroup.UPDATE]
  })
  isTop: boolean = false
  createdBy: any;
}

export class CategoryGetDto extends BasePagingDto {
  @IsOptional({
    groups: [CategoryDtoGroup.GET_PAGING]
  })
  @IsBoolean({
    groups: [CategoryDtoGroup.GET_PAGING]
  })
  isTop: boolean;

  @IsOptional({
    groups: [CategoryDtoGroup.GET_PAGING]
  })
  @IsMongoId({
    groups: [CategoryDtoGroup.GET_PAGING]
  })
  parentId?: string;
}



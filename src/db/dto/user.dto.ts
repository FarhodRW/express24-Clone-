import 'reflect-metadata'
import { Type } from 'class-transformer';
import { BaseDtoGroup } from './common.dto';
import { IsBoolean, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class UserDtoGroup extends BaseDtoGroup {
  static LOGIN = 'login'
  static VERIFY = 'verify'
  static REGISTER = 'register'
}

export class UserDto {
  @IsOptional({
    groups: [UserDtoGroup.UPDATE]
  })
  @IsString({
    groups: [UserDtoGroup.REGISTER, UserDtoGroup.UPDATE]
  })
  name: string;

  @IsOptional({
    groups: [UserDtoGroup.UPDATE]
  })
  @IsString({
    groups: [UserDtoGroup.REGISTER, UserDtoGroup.UPDATE, UserDtoGroup.LOGIN]
  })
  @MinLength(3, {
    groups: [UserDtoGroup.REGISTER, UserDtoGroup.UPDATE]
  })
  password: string;

  @IsString({ groups: [UserDtoGroup.REGISTER, UserDtoGroup.LOGIN] })
  email: string;

  @IsOptional({
    groups: [UserDtoGroup.UPDATE, UserDtoGroup.REGISTER,]
  })
  @IsBoolean({
    groups: [UserDtoGroup.REGISTER, UserDtoGroup.UPDATE]
  })
  isAdmin?: boolean;

  @IsOptional({
    groups: [UserDtoGroup.UPDATE, UserDtoGroup.REGISTER,]
  })
  @IsBoolean({
    groups: [UserDtoGroup.REGISTER, UserDtoGroup.UPDATE]
  })
  isSuperAdmin?: boolean;

  @Min(1, {
    groups: [UserDtoGroup.CREATE, UserDtoGroup.UPDATE]
  })
  balance: number;

  @IsOptional({
    groups: [UserDtoGroup.CREATE, UserDtoGroup.UPDATE]
  })
  @IsString({
    groups: [UserDtoGroup.CREATE, UserDtoGroup.UPDATE]
  })
  image: string;
}





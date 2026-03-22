import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import {
  toLowerCaseTrimmedString,
  toNullableTrimmedString,
} from '../../../common/transformers/string.transformer';

export class UpdateUserDto {
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  createdAt?: Date;

  @Transform(toLowerCaseTrimmedString)
  @IsOptional()
  @IsEmail()
  email?: string;

  @Transform(toNullableTrimmedString)
  @IsOptional()
  @IsString()
  @MaxLength(120)
  name?: string | null;

  @Transform(toNullableTrimmedString)
  @IsOptional()
  @IsString()
  @MaxLength(120)
  organization?: string | null;

  @IsOptional()
  @IsBoolean()
  isOnboarded?: boolean;
}

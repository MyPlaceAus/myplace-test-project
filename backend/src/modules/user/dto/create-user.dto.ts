import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import {
  toLowerCaseTrimmedString,
  toNullableTrimmedString,
} from '../../../common/transformers/string.transformer';

export class CreateUserDto {
  @Transform(toLowerCaseTrimmedString)
  @IsEmail()
  email: string;

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

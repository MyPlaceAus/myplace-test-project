import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  toLowerCaseTrimmedString,
  toNullableTrimmedString,
  toTrimmedString,
} from '../../../common/transformers/string.transformer';

export class SignUpDto {
  @Transform(toLowerCaseTrimmedString)
  @IsEmail()
  email: string;

  @Transform(toTrimmedString)
  @IsString()
  @MinLength(6)
  password: string;

  @Transform(toNullableTrimmedString)
  @IsOptional()
  @IsString()
  @MaxLength(120)
  name?: string | null;

  @Transform(toNullableTrimmedString)
  @IsOptional()
  @IsString()
  @MaxLength(120)
  company?: string | null;

  @Transform(toTrimmedString)
  @IsOptional()
  @IsString()
  @MaxLength(60)
  role?: string;
}

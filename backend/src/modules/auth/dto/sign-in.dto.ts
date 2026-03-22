import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';
import {
  toLowerCaseTrimmedString,
  toTrimmedString,
} from '../../../common/transformers/string.transformer';

export class SignInDto {
  @Transform(toLowerCaseTrimmedString)
  @IsEmail()
  email: string;

  @Transform(toTrimmedString)
  @IsString()
  @MinLength(6)
  password: string;
}

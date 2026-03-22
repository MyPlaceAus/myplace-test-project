import { Transform } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { toLowerCaseTrimmedString } from '../../../common/transformers/string.transformer';

export class LoginDto {
  @Transform(toLowerCaseTrimmedString)
  @IsEmail()
  email: string;
}

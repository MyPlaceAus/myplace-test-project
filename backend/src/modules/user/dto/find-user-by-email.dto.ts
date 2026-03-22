import { Transform } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { toLowerCaseTrimmedString } from '../../../common/transformers/string.transformer';

export class FindUserByEmailDto {
  @Transform(toLowerCaseTrimmedString)
  @IsEmail()
  email: string;
}

import { Transform, Type } from 'class-transformer';
import { IsInt, IsString, MaxLength, Min } from 'class-validator';
import { toTrimmedString } from '../../../common/transformers/string.transformer';

export class CreateProjectDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  userId: number;

  @Transform(toTrimmedString)
  @IsString()
  @MaxLength(200)
  title: string;

  @Transform(toTrimmedString)
  @IsString()
  @MaxLength(500)
  image: string;
}

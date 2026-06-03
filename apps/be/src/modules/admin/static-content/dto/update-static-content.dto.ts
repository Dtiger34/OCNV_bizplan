import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class BilingualContentDto {
  @IsString()
  vi!: string;

  @IsString()
  en!: string;
}

export class UpdateStaticContentDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => BilingualContentDto)
  content!: BilingualContentDto;
}

import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty()
  @IsString()
  fullName!: string;

  @ApiProperty()
  @IsString()
  phone!: string;

  @ApiProperty()
  @IsString()
  province!: string;

  @ApiProperty()
  @IsString()
  district!: string;

  @ApiProperty()
  @IsString()
  ward!: string;

  @ApiProperty()
  @IsString()
  street!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}

import { IsNumber, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AddCartItemDto {
  @ApiProperty()
  @IsString()
  productId!: string;

  @ApiProperty({ minimum: 1 })
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  quantity!: number;
}

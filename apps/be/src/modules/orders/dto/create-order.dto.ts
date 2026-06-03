import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaymentMethod } from '../../../common/enums';

class ShippingAddressDto {
  @IsString() fullName: string;
  @IsString() phone: string;
  @IsString() province: string;
  @IsString() district: string;
  @IsString() ward: string;
  @IsString() street: string;
}

class OrderItemDto {
  @IsString() productId: string;
  @IsNumber() @Min(1) @Type(() => Number) quantity: number;
}

export class CreateOrderDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => ShippingAddressDto)
  shippingAddress!: ShippingAddressDto;

  @ApiProperty({ type: [OrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items!: OrderItemDto[];

  @ApiProperty({ enum: PaymentMethod })
  @IsEnum(PaymentMethod)
  paymentMethod!: PaymentMethod;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  customerNote?: string;
}

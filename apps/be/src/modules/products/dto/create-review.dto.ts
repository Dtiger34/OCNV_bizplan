import { IsArray, IsNumber, IsOptional, IsString, IsUrl, Max, Min, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty()
  @IsString()
  orderId!: string;

  @ApiProperty({ minimum: 1, maximum: 5 })
  @IsNumber()
  @Min(1)
  @Max(5)
  @Type(() => Number)
  rating!: number;

  @ApiProperty({ minLength: 10 })
  @IsString()
  @MinLength(10)
  content!: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  imageUrls?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  videoUrl?: string;
}

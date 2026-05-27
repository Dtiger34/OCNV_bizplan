import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { GetProductsQueryDto } from './dto/get-products-query.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'List products with filters' })
  async findAll(@Query() query: GetProductsQueryDto) {
    return this.productsService.findAll(query);
  }

  @Public()
  @Get('featured')
  @ApiOperation({ summary: 'Get featured products' })
  async findFeatured() {
    return this.productsService.findFeatured();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get product detail' })
  async findById(@Param('id') id: string) {
    return this.productsService.findById(id);
  }

  @Public()
  @Get(':id/related')
  @ApiOperation({ summary: 'Get related products' })
  async findRelated(@Param('id') id: string) {
    return this.productsService.findRelated(id);
  }

  @Public()
  @Get(':id/reviews')
  @ApiOperation({ summary: 'Get reviews for a product' })
  async findReviews(
    @Param('id') id: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.productsService.findReviews(id, +page, +limit);
  }

  @ApiBearerAuth()
  @Post(':id/reviews')
  @ApiOperation({ summary: 'Create a review for a product' })
  async createReview(
    @Param('id') id: string,
    @CurrentUser() user: { userId: string },
    @Body() dto: CreateReviewDto,
  ) {
    return this.productsService.createReview(id, user.userId, dto);
  }
}

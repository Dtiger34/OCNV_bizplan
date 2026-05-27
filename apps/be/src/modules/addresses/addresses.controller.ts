import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('addresses')
@ApiBearerAuth()
@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all addresses of current user' })
  async findAll(@CurrentUser() user: { userId: string }) {
    return this.addressesService.findAll(user.userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new address' })
  async create(@CurrentUser() user: { userId: string }, @Body() dto: CreateAddressDto) {
    return this.addressesService.create(user.userId, dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an address' })
  async update(
    @CurrentUser() user: { userId: string },
    @Param('id') id: string,
    @Body() dto: UpdateAddressDto,
  ) {
    return this.addressesService.update(user.userId, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an address' })
  async remove(@CurrentUser() user: { userId: string }, @Param('id') id: string) {
    return this.addressesService.remove(user.userId, id);
  }

  @Patch(':id/default')
  @ApiOperation({ summary: 'Set address as default' })
  async setDefault(@CurrentUser() user: { userId: string }, @Param('id') id: string) {
    return this.addressesService.setDefault(user.userId, id);
  }
}

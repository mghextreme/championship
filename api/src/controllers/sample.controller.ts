import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { SampleCreateDto, SampleUpdateDto, QueryResultDto } from 'src/models';
import { SampleService } from 'src/services';
import { Sample } from 'src/entities';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('sample')
@Controller('sample')
@UseInterceptors(ClassSerializerInterceptor)
export class SampleController {

  constructor(private readonly service: SampleService) {}

  @Get()
  @ApiResponse({ type: Sample, isArray: true })
  async findAll(): Promise<Sample[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiResponse({ type: Sample })
  async findOne(@Param('id') id: number): Promise<Sample> {
    return this.service.findOne(id);
  }

  @Post()
  @ApiResponse({ type: Sample })
  async create(@Body() createDto: SampleCreateDto): Promise<Sample> {
    return this.service.create(createDto);
  }

  @Put(':id')
  @ApiResponse({ type: Sample })
  update(@Param('id') id: number, @Body() updateDto: SampleUpdateDto): Promise<Sample> {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiResponse({ type: QueryResultDto })
  remove(@Param('id') id: number): Promise<QueryResultDto> {
    return this.service.remove(id);
  }

}

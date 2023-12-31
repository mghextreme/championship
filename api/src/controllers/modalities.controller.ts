import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ModalitiesService } from 'src/services';
import { Modality } from 'src/entities';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ModalityDto, QueryResultDto } from 'src/models';
import { Public } from './decorators';

@ApiTags('modalities')
@Controller('modalities')
@UseInterceptors(ClassSerializerInterceptor)
export class ModalitiesController {

  constructor(private readonly service: ModalitiesService) {}

  @Public()
  @Get()
  @ApiResponse({ type: Modality, isArray: true })
  async findAll(): Promise<Modality[]> {
    return this.service.findAll();
  }

  @Public()
  @Get(':id')
  @ApiResponse({ type: Modality })
  async findOne(@Param('id') id: number): Promise<Modality> {
    return this.service.findOne(id);
  }

  @Post()
  @ApiResponse({ type: Modality })
  async create(@Body() createDto: ModalityDto): Promise<Modality> {
    return this.service.create(createDto);
  }

  @Put(':id')
  @ApiResponse({ type: Modality })
  update(@Param('id') id: number, @Body() updateDto: ModalityDto): Promise<Modality> {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiResponse({ type: QueryResultDto })
  remove(@Param('id') id: number): Promise<QueryResultDto> {
    return this.service.remove(id);
  }

}

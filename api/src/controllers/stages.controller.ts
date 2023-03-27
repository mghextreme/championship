import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { StagesService } from 'src/services';
import { QueryResultDto, RoundRobinStageViewModel, SingleBracketStageViewModel, StageCreateDto, StageUpdateDto } from 'src/models';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Stage } from 'src/entities';
import { Public } from './decorators';

@ApiTags('stages')
@Controller('stages')
@UseInterceptors(ClassSerializerInterceptor)
export class StagesController {

  constructor(private readonly service: StagesService) {}

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<SingleBracketStageViewModel | RoundRobinStageViewModel> {
    return this.service.findOne(id);
  }

  @Post()
  @ApiResponse({ type: Stage })
  async create(@Body() createDto: StageCreateDto): Promise<Stage> {
    return this.service.create(createDto);
  }

  @Put(':id')
  @ApiResponse({ type: Stage })
  update(@Param('id') id: number, @Body() updateDto: StageUpdateDto): Promise<Stage> {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiResponse({ type: QueryResultDto })
  remove(@Param('id') id: number): Promise<QueryResultDto> {
    return this.service.remove(id);
  }

}

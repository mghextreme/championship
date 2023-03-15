import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { TeamCreateDto, TeamUpdateDto, QueryResultDto } from 'src/models';
import { TeamsService } from 'src/services';
import { Sample } from 'src/entities';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('teams')
@Controller('teams')
@UseInterceptors(ClassSerializerInterceptor)
export class TeamsController {

  constructor(private readonly service: TeamsService) {}

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
  async create(@Body() createDto: TeamCreateDto): Promise<Sample> {
    return this.service.create(createDto);
  }

  @Put(':id')
  @ApiResponse({ type: Sample })
  update(@Param('id') id: number, @Body() updateDto: TeamUpdateDto): Promise<Sample> {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiResponse({ type: QueryResultDto })
  remove(@Param('id') id: number): Promise<QueryResultDto> {
    return this.service.remove(id);
  }

}

import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { TeamCreateDto, TeamUpdateDto, QueryResultDto } from 'src/models';
import { TeamsService } from 'src/services';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Team } from 'src/entities';
import { Public } from './decorators';

@ApiTags('teams')
@Controller('teams')
@UseInterceptors(ClassSerializerInterceptor)
export class TeamsController {

  constructor(private readonly service: TeamsService) {}

  @Public()
  @Get()
  @ApiResponse({ type: Team, isArray: true })
  async findAll(): Promise<Team[]> {
    return this.service.findAll();
  }

  @Public()
  @Get(':id')
  @ApiResponse({ type: Team })
  async findOne(@Param('id') id: number): Promise<Team> {
    return this.service.findOne(id);
  }

  @Post()
  @ApiResponse({ type: Team })
  async create(@Body() createDto: TeamCreateDto): Promise<Team> {
    return this.service.create(createDto);
  }

  @Put(':id')
  @ApiResponse({ type: Team })
  update(@Param('id') id: number, @Body() updateDto: TeamUpdateDto): Promise<Team> {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiResponse({ type: QueryResultDto })
  remove(@Param('id') id: number): Promise<QueryResultDto> {
    return this.service.remove(id);
  }

}

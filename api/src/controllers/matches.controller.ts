import { ClassSerializerInterceptor, Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { MatchesService } from 'src/services';
import { Match } from 'src/entities';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from './decorators';

@ApiTags('matches')
@Controller('matches')
@UseInterceptors(ClassSerializerInterceptor)
export class MatchesController {

  constructor(private readonly service: MatchesService) {}

  @Public()
  @Get('?')
  @ApiResponse({ type: Match, isArray: true })
  async find(
    @Query('modality') modality: number = undefined,
    @Query('finished') finished: boolean = undefined): Promise<Match[]> {
    return this.service.find(modality, finished);
  }

  @Public()
  @Get(':id')
  @ApiResponse({ type: Match })
  async findOne(@Param('id') id: number): Promise<Match> {
    return this.service.findOne(id);
  }

}

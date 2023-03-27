import { ClassSerializerInterceptor, Controller, Get, Param, UseInterceptors } from '@nestjs/common';
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
  @Get(':id')
  @ApiResponse({ type: Match })
  async findOne(@Param('id') id: number): Promise<Match> {
    return this.service.findOne(id);
  }

}

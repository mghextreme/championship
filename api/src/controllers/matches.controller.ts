import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { MatchesService } from 'src/services';
import { Match } from 'src/entities';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from './decorators';
import { Transform } from 'class-transformer';
import { toBoolean, toNumber } from '../utils/helper/cast.helper';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

class GetMatchParams {
  @Transform(({ value }) => toNumber(value))
  @IsNumber()
  @IsOptional()
  public modality?: number;

  @Transform(({ value }) => toBoolean(value))
  @IsBoolean()
  @IsOptional()
  public finished: boolean = false;
}

@ApiTags('matches')
@Controller('matches')
@UseInterceptors(ClassSerializerInterceptor)
export class MatchesController {
  constructor(private readonly service: MatchesService) {}

  @Public()
  @Get()
  @ApiResponse({ type: Match, isArray: true })
  async find(
    @Query() query: GetMatchParams,
  ): Promise<Match[]> {
    return this.service.find(query.modality, query.finished);
  }

  @Public()
  @Get(':id')
  @ApiResponse({ type: Match })
  async findOne(@Param('id') id: number): Promise<Match> {
    return this.service.findOne(id);
  }
}

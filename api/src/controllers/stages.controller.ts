import { ClassSerializerInterceptor, Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { StagesService } from 'src/services';
import { RoundRobinStageViewModel, SingleBracketStageViewModel } from 'src/models';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('stages')
@Controller('stages')
@UseInterceptors(ClassSerializerInterceptor)
export class StagesController {

  constructor(private readonly service: StagesService) {}

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<SingleBracketStageViewModel | RoundRobinStageViewModel> {
    return this.service.findOne(id);
  }

}

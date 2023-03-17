import { ClassSerializerInterceptor, Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { ModalitiesService } from 'src/services';
import { Modality } from 'src/entities';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('modalities')
@Controller('modalities')
@UseInterceptors(ClassSerializerInterceptor)
export class ModalitiesController {

  constructor(private readonly service: ModalitiesService) {}

  @Get()
  @ApiResponse({ type: Modality, isArray: true })
  async findAll(): Promise<Modality[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiResponse({ type: Modality })
  async findOne(@Param('id') id: number): Promise<Modality> {
    return this.service.findOne(id);
  }

}

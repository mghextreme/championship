import { ModalityCreateDto } from "./modality.create.dto";
import { IUpdateDto } from "./update.dto.interface";
import { Modality } from "src/entities";
import { ApiProperty } from "@nestjs/swagger";

export class ModalityUpdateDto extends ModalityCreateDto implements IUpdateDto<Modality> {
  @ApiProperty({ required: true })
  id: number;
}

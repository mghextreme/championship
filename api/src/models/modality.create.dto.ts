import { ApiProperty } from "@nestjs/swagger";
import { ICreateDto } from "./create.dto.interface";
import { Modality } from "src/entities";

export class ModalityCreateDto implements ICreateDto<Modality> {
  @ApiProperty({ required: true })
  name: string;
}

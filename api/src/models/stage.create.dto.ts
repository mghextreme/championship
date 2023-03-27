import { ApiProperty } from "@nestjs/swagger";
import { ICreateDto } from "./create.dto.interface";
import { Stage, StageType } from "src/entities";

export class StageCreateDto implements ICreateDto<Stage> {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  modalityId: number;

  @ApiProperty({ enum: StageType })
  type: StageType;
}

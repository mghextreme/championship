import { ApiProperty } from "@nestjs/swagger";
import { Stage, StageType } from "src/entities";

export class StageDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  modalityId: number;

  @ApiProperty({ enum: StageType, required: true })
  type: StageType;
}

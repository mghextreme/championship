import { StageCreateDto } from "./stage.create.dto";
import { IUpdateDto } from "./update.dto.interface";
import { Stage } from "src/entities";
import { ApiProperty } from "@nestjs/swagger";

export class StageUpdateDto extends StageCreateDto implements IUpdateDto<Stage> {
  @ApiProperty({ required: true })
  id: number;
}

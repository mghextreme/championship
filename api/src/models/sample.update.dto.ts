import { SampleCreateDto } from "./sample.create.dto";
import { IUpdateDto } from "./update.dto.interface";
import { Sample } from "src/entities";
import { ApiProperty } from "@nestjs/swagger";

export class SampleUpdateDto extends SampleCreateDto implements IUpdateDto<Sample> {
  @ApiProperty({ required: true })
  id: number;
}

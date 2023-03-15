import { ApiProperty } from "@nestjs/swagger";
import { ICreateDto } from "./create.dto.interface";
import { Sample } from "src/entities";

export class TeamCreateDto implements ICreateDto<Sample> {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty()
  color: string;
}

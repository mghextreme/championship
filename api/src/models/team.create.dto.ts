import { ApiProperty } from "@nestjs/swagger";
import { ICreateDto } from "./create.dto.interface";
import { Team } from "src/entities";

export class TeamCreateDto implements ICreateDto<Team> {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty()
  color: string;
}

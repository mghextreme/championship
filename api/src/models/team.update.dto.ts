import { TeamCreateDto } from "./team.create.dto";
import { IUpdateDto } from "./update.dto.interface";
import { Team } from "src/entities";
import { ApiProperty } from "@nestjs/swagger";

export class TeamUpdateDto extends TeamCreateDto implements IUpdateDto<Team> {
  @ApiProperty({ required: true })
  id: number;
}

import { ApiProperty } from "@nestjs/swagger"
import { Match, StageType } from "src/entities"
import { StandingsRowViewModel } from "./standings-row.view-model"

export class RoundRobinStageViewModel {
  @ApiProperty()
  id: number
  
  @ApiProperty()
  name: string
  
  @ApiProperty({ enum: StageType })
  type: StageType
  
  @ApiProperty()
  standings: StandingsRowViewModel[]
  
  @ApiProperty()
  matches: Match[]
}

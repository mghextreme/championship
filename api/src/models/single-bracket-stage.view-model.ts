import { ApiProperty } from "@nestjs/swagger"
import { Match, StageType } from "src/entities"

export class SingleBracketStageViewModel {
  @ApiProperty()
  id: number
  
  @ApiProperty()
  name: string
  
  @ApiProperty({ enum: StageType })
  type: StageType
  
  @ApiProperty()
  root: Match
}

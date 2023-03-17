import { ApiProperty } from "@nestjs/swagger"
import { Team } from "src/entities"

export class StandingsRowViewModel {
  @ApiProperty()
  team: Team

  @ApiProperty()
  position?: number

  @ApiProperty()
  points: number = 0

  @ApiProperty()
  wins: number = 0

  @ApiProperty()
  ties: number = 0

  @ApiProperty()
  losses: number = 0

  @ApiProperty()
  scorePro: number = 0

  @ApiProperty()
  scoreAgainst: number = 0
}

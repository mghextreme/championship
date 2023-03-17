import { ITeam } from "./team.interface"

export interface IRoundRobinStandingsRow {
  team: ITeam
  position: number
  points: number
  wins: number
  ties: number
  losses: number
  scorePro: number
  scoreAgainst: number
}

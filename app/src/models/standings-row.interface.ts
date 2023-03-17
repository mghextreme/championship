import { ITeam } from "./team.interface"

export interface IStandingsRow {
  team: ITeam
  points: number
  wins: number
  ties: number
  losses: number
  scorePro: number
  scoreAgainst: number
}

import { ITeamScore } from "./team-score.interface";

export interface IGame {
  name?: string
  teams: ITeamScore[]
}

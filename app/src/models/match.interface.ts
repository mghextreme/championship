import { ITeamScore } from "./team-score.interface";

export interface IMatch {
  id?: number
  finished: boolean
  teamScores?: ITeamScore[]
  precedingMatches?: IMatch[]
}

import moment from 'moment';
import { ITeamScore } from "./team-score.interface";
import { IStage } from "./stage.interface";

export interface IMatch {
  id?: number
  finished: boolean
  teamScores?: ITeamScore[]
  precedingMatches?: IMatch[]
  startDateTime?: moment.Moment
  stage?: IStage
}

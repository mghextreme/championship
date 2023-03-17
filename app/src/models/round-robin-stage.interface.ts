import { IMatch } from "./match.interface"
import { IRoundRobinStandingsRow } from "./round-robin-standings-row.interface"
import { IStage } from "./stage.interface"

export interface IRoundRobinStage extends IStage {
  standing?: IRoundRobinStandingsRow[]
  matches?: IMatch[]
}

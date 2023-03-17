import { IMatch } from "./match.interface"
import { IStandingsRow } from "./standings-row.interface"
import { IStage } from "./stage.interface"

export interface IRoundRobinStage extends IStage {
  standings?: IStandingsRow[]
  matches?: IMatch[]
}

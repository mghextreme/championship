import { IMatch } from "./match.interface"
import { IStage } from "./stage.interface"

export interface ISingleBracketStage extends IStage {
  root?: IMatch
}

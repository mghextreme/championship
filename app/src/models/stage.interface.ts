import { StageType } from "./stage-type.enum"

export interface IStage {
  id?: number
  name: string
  finished: boolean
  type: StageType
}

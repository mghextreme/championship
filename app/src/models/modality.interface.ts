import { IStage } from "./stage.interface"

export interface IModality {
  id?: number
  name: string
  stages?: IStage[]
}

import { AxiosResponse } from "axios"
import { IRoundRobinStage, ISingleBracketStage } from "../models"
import api from "./api"

export class StagesService {
  PREFIX = '/stages/'

  findOne(id: number): Promise<AxiosResponse<ISingleBracketStage | IRoundRobinStage>> {
    return api.get(this.PREFIX + id)
  }
}

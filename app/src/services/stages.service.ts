import { AxiosResponse } from "axios"
import { IStage } from "../models"
import api from "./api"

export class StagesService {
  PREFIX = '/stages/'

  findOne(id: number): Promise<AxiosResponse<IStage>> {
    return api.get(this.PREFIX + id)
  }
}

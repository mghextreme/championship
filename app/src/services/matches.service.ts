import { AxiosResponse } from "axios"
import { IMatch } from "../models"
import api from "./api"

export class MatchesService {
  PREFIX = '/matches/'

  findOne(id: number): Promise<AxiosResponse<IMatch>> {
    return api.get(this.PREFIX + id)
  }

  findNextByModality(id: number): Promise<AxiosResponse<IMatch[]>> {
    return api.get(this.PREFIX + `?modality=${id}&finished=false`)
  }

  findFinishedByModality(id: number): Promise<AxiosResponse<IMatch[]>> {
    return api.get(this.PREFIX + `?modality=${id}&finished=true`)
  }
}

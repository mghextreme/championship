import { AxiosResponse } from "axios";
import { IModality } from "../models/modality.interface";
import api from "./api";

export class ModalitiesService {
  PREFIX = '/modalities/'

  findAll(): Promise<AxiosResponse<IModality[]>> {
    return api.get<IModality[]>(this.PREFIX)
  }

  findOne(id: number): Promise<AxiosResponse<IModality>> {
    return api.get<IModality>(this.PREFIX + id)
  }
}

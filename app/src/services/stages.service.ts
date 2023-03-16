import api from "./api";

export class StagesService {
  PREFIX = '/stages/'

  findOne(id: number) {
    return api.get(this.PREFIX + id)
  }
}

import { IGame } from "./game.interface"

export interface IBracketRound {
  name?: string
  games: IGame[]
}

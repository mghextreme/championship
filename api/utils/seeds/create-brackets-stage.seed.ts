import { Match, Stage, Team, TeamMatchScore } from "../../src/entities";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export default class CreateBracketsStage implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const stage = await factory(Stage)().create()
    const final = await factory(Match)().create({ stage, round: 1 })
    const semiFinals = await factory(Match)().createMany(2, { stage, round: 2, nextMatch: final })
    const teams = await factory(Team)().createMany(4)

    let teamIx = 0
    for (let match of semiFinals) {
      await factory(TeamMatchScore)().create({ match, team: teams[teamIx], score: 0 })
      teamIx++
      await factory(TeamMatchScore)().create({ match, team: teams[teamIx], score: 0 })
      teamIx++
    }

    await factory(TeamMatchScore)().createMany(2, { match: final, score: 0 })
  }
}

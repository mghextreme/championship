import { Match, Team, TeamMatchScore } from "../../src/entities";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export default class CreateMatches implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const match = await factory(Match)().create()
    const teams = await factory(Team)().createMany(2)

    for (let team of teams) {
      await factory(TeamMatchScore)().create({ match: match, team: team, score: 0 })
    }
  }
}

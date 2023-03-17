import { Match, Modality, Stage, StageType, Team, TeamMatchScore } from "../../src/entities";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export default class CreateModality implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const modality = await factory(Modality)().create({ name: 'Men\'s Football' })

    await this.createRoundRobinStage(factory, modality, 'Group A')
    await this.createRoundRobinStage(factory, modality, 'Group B')

    const playoffsStage = await factory(Stage)().create({ modality, name: 'Playoffs' })
    const final = await factory(Match)().create({ stage: playoffsStage, round: 1 })
    await factory(TeamMatchScore)().createMany(2, { match: final, score: 0 })

    const semiFinals = await factory(Match)().createMany(2, { stage: playoffsStage, round: 2, nextMatch: final })
    for (let match of semiFinals) {
      await factory(TeamMatchScore)().createMany(2, { match })
    }
  }

  async createRoundRobinStage(factory: Factory, modality: Modality, stageName: string) {
    const stage = await factory(Stage)().create({ modality, name: stageName, type: StageType.RoundRobin })
    const teams = await factory(Team)().createMany(3)
    const matches = await factory(Match)().createMany(3, { stage })

    let teamIx = 0
    for (let match of matches) {
      await factory(TeamMatchScore)().create({ match, team: teams[++teamIx % 3] })
      await factory(TeamMatchScore)().create({ match, team: teams[++teamIx % 3] })
    }
  }
}

import { Match, Modality, Stage, StageType, Team, TeamMatchScore } from "../../src/entities";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export default class CreateModality implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const modality = await factory(Modality)().create({ name: 'Men\'s Football' })

    const groupA = await this.createRoundRobinStage(factory, modality, 'Group A', true)
    const groupB = await this.createRoundRobinStage(factory, modality, 'Group B', true)
    await this.createRoundRobinStage(factory, modality, 'Group C')
    await this.createRoundRobinStage(factory, modality, 'Group D')

    const playoffsStage = await factory(Stage)().create({ modality, name: 'Playoffs' })
    const final = await factory(Match)().create({ stage: playoffsStage, round: 1 })
    await factory(TeamMatchScore)().createMany(2, { match: final })

    const semiFinals = await factory(Match)().createMany(2, { stage: playoffsStage, round: 2, nextMatch: final })
    await factory(TeamMatchScore)().create({ match: semiFinals[0], team: groupA['teams'][2] })
    await factory(TeamMatchScore)().create({ match: semiFinals[0], team: groupB['teams'][2] })
    await factory(TeamMatchScore)().createMany(2, { match: semiFinals[1] })
  }

  async createRoundRobinStage(factory: Factory, modality: Modality, stageName: string, completed: boolean = false) {
    const stage = await factory(Stage)().create({ modality, name: stageName, type: StageType.RoundRobin, finished: completed })
    const teams = await factory(Team)().createMany(3)
    const matches = await factory(Match)().createMany(3, { stage, finished: completed })

    let teamIx = 0
    for (let match of matches) {
      await factory(TeamMatchScore)().create({ match, team: teams[teamIx % 3], score: completed ? teamIx % 3 : null })
      teamIx++;
      await factory(TeamMatchScore)().create({ match, team: teams[teamIx % 3], score: completed ? teamIx % 3 : null })
      teamIx++;
    }

    return {
      stage,
      teams,
      matches
    }
  }
}

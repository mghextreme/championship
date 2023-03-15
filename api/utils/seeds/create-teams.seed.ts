import { Team } from "../../src/entities";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export default class CreateTeams implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(Team)().createMany(2)
  }
}

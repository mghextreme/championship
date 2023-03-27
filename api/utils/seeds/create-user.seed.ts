import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { User } from "../../src/entities";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export default class CreateModality implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    dotenv.parse('../../../.env')

    await factory(User)().create({
      name: 'Admin',
      username: process.env.ADMIN_USER,
      password: bcrypt.hashSync(process.env.ADMIN_PASS, 10)
    })
  }

}

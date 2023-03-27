import Faker from 'faker';
import { User } from "../../src/entities"
import { define } from "typeorm-seeding"

define(User, (faker: typeof Faker) => {
  const user = new User()
  user.name = faker.name.firstName()
  return user
})

import Faker from 'faker';
import { Team } from "../../src/entities"
import { define } from "typeorm-seeding"

define(Team, (faker: typeof Faker) => {
  const team = new Team()
  team.name = faker.company.companyName()
  team.color = '#' + faker.random.number(255).toString(16).padStart(2, '0') + faker.random.number(255).toString(16).padStart(2, '0') + faker.random.number(255).toString(16).padStart(2, '0')
  return team
})

import Faker from 'faker';
import { Match } from "../../src/entities"
import { define } from "typeorm-seeding"

define(Match, (faker: typeof Faker) => {
  const match = new Match()
  match.finished = false
  match.startDateTime = faker.date.future(1)
  return match
})

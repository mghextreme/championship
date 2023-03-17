import Faker from 'faker';
import { TeamMatchScore } from "../../src/entities"
import { define } from "typeorm-seeding"

define(TeamMatchScore, (faker: typeof Faker) => {
  return new TeamMatchScore()
})

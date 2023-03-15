import Faker from 'faker';
import { TeamMatchScore } from "../../src/entities"
import { define } from "typeorm-seeding"

define(TeamMatchScore, (faker: typeof Faker) => {
  const teamMatchScore = new TeamMatchScore()
  teamMatchScore.score = 0
  return teamMatchScore
})

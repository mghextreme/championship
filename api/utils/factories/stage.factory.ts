import Faker from 'faker';
import { Stage } from "../../src/entities"
import { define } from "typeorm-seeding"

define(Stage, (faker: typeof Faker) => {
  const stage = new Stage()
  stage.name = faker.name.title()
  return stage
})

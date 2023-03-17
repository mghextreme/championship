import Faker from 'faker';
import { Modality } from "../../src/entities"
import { define } from "typeorm-seeding"

define(Modality, (faker: typeof Faker) => {
  const modality = new Modality()
  modality.name = faker.name.firstName()
  return modality
})

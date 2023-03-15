import * as dotenv from 'dotenv'
import * as entities from '../src/entities'
import configuration from '../src/config/configuration'

dotenv.config({ path: '../.env' })
const config = configuration()

const enititesList = []
Object.values(entities).forEach(value => {
  enititesList.push(value)
})

export default {
  type: config.database.type,
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  logging: config.database.logging,
  synchronize: config.database.synchronize,
  entities: enititesList,
  seeds: [
    'utils/seeds/**/*.seed{.ts,.js}'
  ],
  factories: [
    'utils/factories/**/*.factory{.ts,.js}'
  ]
}

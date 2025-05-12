import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { config } from 'dotenv'

config()

const {
  POSTGRESQL_HOST,
  POSTGRESQL_PORT,
  POSTGRESQL_USER,
  POSTGRESQL_PASSWORD,
  POSTGRESQL_DATABASE,
} = process.env

console.log({
  POSTGRESQL_HOST,
  POSTGRESQL_PORT,
  POSTGRESQL_USER,
  POSTGRESQL_DATABASE,
})

if (
  !POSTGRESQL_HOST ||
  !POSTGRESQL_PORT ||
  !POSTGRESQL_USER ||
  !POSTGRESQL_PASSWORD ||
  !POSTGRESQL_DATABASE
) {
  throw new Error('Missing environment variables')
}

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: POSTGRESQL_HOST,
  port: Number(POSTGRESQL_PORT),
  username: POSTGRESQL_USER,
  password: POSTGRESQL_PASSWORD,
  database: POSTGRESQL_DATABASE,
  synchronize: false,
  logging: false,
  entities:
    process.env.NODE_ENV === 'prod'
      ? ['./dist/entity/*.js']
      : ['./src/entity/*.ts'],
  migrations:
    process.env.NODE_ENV === 'prod'
      ? ['./dist/migration/*.js']
      : ['./src/migration/*.ts'],
  subscribers: [],
})

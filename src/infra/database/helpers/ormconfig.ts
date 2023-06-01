import dotenv from 'dotenv'
dotenv.config()

export default {
  name: 'database-connection',
  type: 'postgres',
  host: process.env.POSTGRES_HOST ?? '127.0.0.1',
  port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432,
  username: process.env.POSTGRES_USERNAME ?? 'root',
  password: process.env.POSTGRES_PASSWORD ?? 'admin',
  database: process.env.POSTGRES_DATABASE ?? 'user-acess-control',
  synchronize: false,
  migrationsRun: true,
  logging: process.env.NODE_ENV === 'develop'
}

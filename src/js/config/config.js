import 'dotenv/config'

const config = {
  DB_CONNECTION: {
    host: process.env.DATABASE_HOST,
    name: process.env.DATABASE_NAME
  }
}

export default config

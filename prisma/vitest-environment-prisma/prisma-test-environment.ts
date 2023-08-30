import 'dotenv/config'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'
import { Environment } from 'vitest'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function generateDatabaseURL(databaseName: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }


  const sqliteFilePath = `./${databaseName}.sqlite` // SQLite file will be stored in the current directory
  return `file:${sqliteFilePath}`
}

export default <Environment>{

  name: 'prisma',
  async setup() {
    const databaseName = `api_solid_test_${randomUUID().replace(/-/g, '_')}`
    const databaseURL = generateDatabaseURL(databaseName)

    process.env.DATABASE_URL = databaseURL

    execSync('npx prisma generate')

    return {
      async teardown() {
        await prisma.$disconnect()
      },
    }
  },
}

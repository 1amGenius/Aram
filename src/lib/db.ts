import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['query', 'error', 'warn'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  // Connection pooling settings
  __internal: {
    engine: {
      connectionLimit: 10, // Maximum number of connections in the pool
      poolTimeout: 10, // Time in seconds to wait for a connection
      connectionTimeout: 5, // Time in seconds to wait for a connection to be established
    },
  },
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma 
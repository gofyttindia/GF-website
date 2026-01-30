/**
 * MongoDB Client Setup
 * 
 * Install: npm install mongodb (or pnpm add mongodb)
 * 
 * This file provides MongoDB client for database operations
 * MongoDB is optional - only loads if MONGODB_URI is configured
 */

let client: any = null
let db: any = null
let MongoClient: any = null
let Db: any = null

const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB_NAME || 'fitnex'

/**
 * Dynamically import MongoDB client (only if needed)
 */
async function getMongoClient() {
  if (!MongoClient) {
    try {
      const mongodb = await import('mongodb')
      MongoClient = mongodb.MongoClient
      Db = mongodb.Db
    } catch (error) {
      throw new Error('MongoDB package not installed. Run: pnpm add mongodb')
    }
  }
  return { MongoClient, Db }
}

/**
 * Get MongoDB database connection
 */
export async function getDatabase() {
  if (!uri) {
    throw new Error('MONGODB_URI not configured')
  }

  const { MongoClient: MC } = await getMongoClient()

  if (db) {
    return db
  }

  if (!client) {
    client = new MC(uri)
    await client.connect()
  }

  db = client.db(dbName)
  return db
}

/**
 * Save form submission to MongoDB
 */
export async function saveFormSubmission(data: any) {
  const database = await getDatabase()
  const collection = database.collection('form_submissions')

  const result = await collection.insertOne({
    plan_type: data.plan || 'Standard',
    name: data.name || data.name1,
    phone: data.phone || data.phone1,
    email: data.email || data.email1,
    age: data.age || data.age1,
    gender: data.gender || data.gender1,
    country: data.country,
    city: data.city,
    occupation: data.occupation || data.occupation1,
    fitness_experience: data.fitnessExperience || data.fitnessExperience1,
    fitness_goal: data.fitnessGoal || data.fitnessGoal1,
    package_duration: data.packageDuration,
    current_weight: data.currentWeight || data.currentWeight1,
    target_weight: data.targetWeight || data.targetWeight2,
    message: data.message,
    submitted_at: new Date(),
  })

  return result
}

/**
 * Close MongoDB connection
 */
export async function closeConnection() {
  if (client) {
    await client.close()
    client = null
    db = null
  }
}



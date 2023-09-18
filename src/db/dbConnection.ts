import envVariables from '../config/envVariables'
import mongoose from 'mongoose'

export const dbConnection = async (): Promise<void> => {
  try {
    await mongoose.connect(envVariables.MONGODB_URI)
    console.log('[✅] Successful database connection')
  } catch (error) {
    console.error('[❌] Error while trying to connect with database')
    console.error(error)
    throw error
  }
}

import { model, Schema } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

const userSchema = new Schema({
  _id: {
    type: String,
    default: uuidv4
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = doc._id
    delete ret.password
    delete ret._id
    delete ret.__v
  }
})

export default model('User', userSchema)

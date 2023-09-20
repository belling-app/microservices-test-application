import { model, Schema } from 'mongoose'

const userSchema = new Schema({
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

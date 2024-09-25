import mongoose from 'mongoose'

const usersSchema = new mongoose.Schema({
  user_id: {
    type: String,
    unique: true,
    require: true,
    default: () => new mongoose.Types.ObjectId(),
  },
  email: { type: String, required: true },
  password: { type: String, required: true },
  permission: { type: String, required: true },
})

const UserSchema = mongoose.model('User', usersSchema)
export default UserSchema
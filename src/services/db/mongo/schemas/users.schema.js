import mongoose from 'mongoose'

const usersSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  permission: { type: String, required: true }
})

const UserModel = mongoose.model('User', usersSchema)
export default UserModel
import mongoose from 'mongoose'

// Products
const productSchema = new mongoose.Schema({
  product_id: {
    type: String,
    unique: true,
    require: true,
    default: () => new mongoose.Types.ObjectId(),
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
})

export const Product = mongoose.model('Product', productSchema)

// Users
const userSchema = new mongoose.Schema({
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

export const User = mongoose.model('User', userSchema)

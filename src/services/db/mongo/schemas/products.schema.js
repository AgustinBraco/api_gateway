import mongoose from 'mongoose'

const productsSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true }
})

const ProductModel = mongoose.model('Product', productsSchema)
export default ProductModel
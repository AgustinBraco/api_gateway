import mongoose from 'mongoose'

const productsSchema = new mongoose.Schema({
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

const ProductSchema = mongoose.model('Product', productsSchema)
export default ProductSchema
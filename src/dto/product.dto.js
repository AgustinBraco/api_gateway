class ProductDTO {
	constructor(product) {
		this.name = product.name
		this.price = product.price || 0
		this.stock = product.stock || 0
	}
}

export default ProductDTO
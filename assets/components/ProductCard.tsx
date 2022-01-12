import type { FC } from 'React'
import type { Book } from '@seeds/books'

interface ProductCardProps {
  product: Book
}

const ProductCard: FC<ProductCardProps> = function ({ product }) {
  console.log('img', product.image)
  return (
    <div>
      <img src={product.image} alt="" />
    </div>
  )
}

export default ProductCard
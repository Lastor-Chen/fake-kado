import type { PropsWithChildren } from 'react'
import type { Book } from '@seeds/books'
import Link from 'next/link'
import Image from 'next/image'

interface ProductCardProps {
  wrapperClass?: string
  product: Book
}

export default function ProductCard({ wrapperClass, product }: PropsWithChildren<ProductCardProps>) {
  let defaultClass = 'd-flex row-cols-2'
  if (wrapperClass) {
    defaultClass += ` ${wrapperClass}`
  }
  return (
    <div className={defaultClass}>
      <div className="col text-center">
        <Link href={`/product/${product.id}`}>
          <a className="d-inline-block next-img-fix bevel">
            <Image src={product.image} width="190" height="271" alt={product.name} />
          </a>
        </Link>
      </div>
      <div className="col ps-3 ps-sm-0 ps-md-3 small color">
        <Link href={`/product/${product.id}`}>
          <a className="fs-6 fw-bold text-reset text-decoration-none">{product.name}</a>
        </Link>
        <div className="mt-2">{product.author}</div>
        <div className="my-3 next-img-fix">
          <Image src="/images/pen.svg" width="16" height="16" alt="" />
          <span className="ps-2">已完結</span>
        </div>
      </div>

      <style jsx>{`
        .color {
          color: var(--theme-ui-colors-gray-8);
        }

        .bevel {
          border-radius: 0.25rem;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}

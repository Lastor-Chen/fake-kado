import Link from 'next/link'
import Image from 'next/image'
import type { PropsWithChildren } from 'react'

const categoryData = [
  { name: '戀愛言情', color: 'pink', icon: 'cate-renai.svg' },
  { name: '異世界奇幻', color: 'gold', icon: 'cate-isekai.svg' },
  { name: '歡樂搞笑', color: 'pelorus', icon: 'cate-gyagu.svg' },
  { name: '全部作品', color: 'gray', icon: 'cate-all.svg' },
]

type CategoryBarProps = {
  wrapperClass?: string
}

export default function CategoryBar(props: PropsWithChildren<CategoryBarProps>) {
  let defaultClass = 'cate-bar row row-cols-2 row-cols-sm-4'
  if (props.wrapperClass) {
    defaultClass += ` ${props.wrapperClass}`
  }
  return (
    <section className={defaultClass}>
      {categoryData.map((cate, idx) => {
        const keyword = cate.name === '全部作品' ? '' : cate.name
        return (
          <Link href={`/search?q=${keyword}`} passHref key={idx}>
            <div className="col">
              <div className="link-box px-3">
                <div className="next-img-fix">
                  <Image src={`/images/${cate.icon}`} width="40" height="40" alt="" />
                </div>
                <span className={`small cate-${cate.color}`}>{cate.name}</span>
              </div>
            </div>
          </Link>
        )
      })}

      <style jsx>{`
        .cate-bar {
          font-weight: bold;
          text-align: center;
          row-gap: 1.25rem;

          & .link-box {
            display: inline-block;
            cursor: pointer;
          }
        }

        .cate-pink {
          color: var(--theme-ui-colors-primary);
        }

        .cate-gold {
          color: var(--theme-ui-colors-harvestGold);
        }

        .cate-pelorus {
          color: var(--theme-ui-colors-pelorus);
        }

        .cate-gray {
          color: var(--theme-ui-colors-gray-6);
        }
      `}</style>
    </section>
  )
}
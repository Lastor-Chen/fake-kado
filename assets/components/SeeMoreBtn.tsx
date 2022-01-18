import type { MouseEventHandler } from 'react'

type SeeMoreBtnProps = {
  onClick: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  wrapperClass?: string
}

export default function SeeMoreBtn(props: SeeMoreBtnProps) {
  let defaultClass = 'text-center'
  if (props.wrapperClass) {
    defaultClass += ` ${props.wrapperClass}`
  }
  return (
    <div className={defaultClass}>
      <button className="more-btn primary-btn small fw-bold" onClick={props.onClick} disabled={props.disabled}>
        看更多
      </button>

      <style jsx>{`
        .more-btn {
          display: inline-block;
          width: 75%;
          max-width: 256px;
          border-radius: 50rem;
          border: none;
          background-color: transparent;

          &:disabled {
            opacity: 0.3;
          }
        }

        .primary-btn {
          color: white;
          background-color: var(--theme-ui-colors-primary);
          border: 1px solid white;
          padding: 0.75rem 0;
        }
      `}</style>
    </div>
  )
}

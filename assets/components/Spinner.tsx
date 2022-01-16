import type { PropsWithChildren } from 'react'

type SpinnerProps = {
  wrapperClass?: string
}

export default function Spinner(props: PropsWithChildren<SpinnerProps>) {
  return (
    <>
      <div className={`py-5 text-center ${props.wrapperClass}`}>
        <div className="spinner-border color" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>

      <style jsx>{`
        .color {
          color: var(--theme-ui-colors-primary);
        }
      `}</style>
    </>
  )
}

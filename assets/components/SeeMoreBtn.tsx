import type { MouseEventHandler } from 'react'

export default function SeeMoreBtn({ onClick }: { onClick: MouseEventHandler<HTMLButtonElement> }) {
  return (
    <div className="mt-4 text-center">
      <button className="more-btn primary-btn small fw-bold" onClick={onClick}>
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

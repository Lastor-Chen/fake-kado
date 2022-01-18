import React, { useRef, useEffect } from 'react'

interface StickyHandlerProps {
  // 誘發 TS 檢查是否為 single child
  children: React.ReactElement
  /** 設定 scroll 在何高度時生效, px 單位 */
  checkPoint: number
  /** 設定 CSS 初始 top 值 */
  initTop: string
  /** 設定 top 移動值 */
  movement: string
}

/**
 * 為 children 的 sticky 添加 scroll 上下滾動特效，
 * child wrapper 本身需設定 sticky CSS，
 * top 值由 StickyScrollEffect 控制
 */
export default function StickyScrollEffect(props: StickyHandlerProps) {
  // 實際確認是否為 single child, 如否會 throw error
  const childElement = React.Children.only(props.children)
  const { checkPoint, initTop, movement } = props

  const wrapperDOM = useRef<HTMLElement>(null)
  const preScrollY = useRef(0)

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY
      const isScrollUp = preScrollY.current > currentScrollY

      if (currentScrollY > checkPoint) {
        if (isScrollUp) {
          wrapperDOM.current!.style.top = initTop
        } else {
          wrapperDOM.current!.style.top = movement
        }
      }

      // 紀錄前一個 frame 的 scrollY
      preScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [checkPoint, initTop, movement])

  return React.cloneElement(childElement, {
    ref: wrapperDOM,
    style: { top: initTop },
  })
}

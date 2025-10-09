import { useState, useLayoutEffect } from "react";

export const useWindowWidth = () => {
  const [screen, setScreen] = useState(typeof window !==
    'undefined' ?
    window.innerWidth :
    0)

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return

    const screenSizeHandle = () => {
      setScreen(window.innerWidth)
    };

    window.addEventListener('resize', screenSizeHandle)
    return () => {
      window.removeEventListener('resize', screenSizeHandle)
    }
  }, [])
  return screen
}
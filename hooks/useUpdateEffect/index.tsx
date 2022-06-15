import React, { useRef, useEffect } from 'react'

/*  This hook is like useEffect except that it doesn't run on the initial render.
    Instead, it only runs when there's an update to the dependencies passed in  */
export default function useUpdateEffect(callback, dependencies: any[]) {
  const firstRenderRef = useRef(true)

  useEffect(() => {
    if (firstRenderRef.current) {
      return (firstRenderRef.current = false)
    }
    return callback()
  }, dependencies)
}

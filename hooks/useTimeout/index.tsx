import React, { useCallback, useEffect, useRef } from 'react'

const useTimeout = (callback: () => void, delay: number) => {
  const callbackRef = useRef(callback)
  const timeoutRef = useRef()

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  //when delay changes, reset the timeout
  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay)
  }, [delay])

  //allows ability to clear timeout
  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current)
  }, [])

  //everytime delay, set, or clear changes, the timeout is set
  useEffect(() => {
    set()
    return clear
  }, [delay, set, clear])

  const reset = useCallback(() => {
    clear()
    set()
  }, [clear, set])

  return { reset, clear }
}

export default useTimeout

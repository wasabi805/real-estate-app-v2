import React, { useEffect } from 'react'
import useTimeout from '@hooks/useTimeout'

const useDebounce = (
  callback: () => void,
  delay: number,
  dependencies: any
) => {
  const { reset, clear } = useTimeout(callback, delay)
  useEffect(reset, [...dependencies, reset])

  useEffect(clear, [])
}

export default useDebounce

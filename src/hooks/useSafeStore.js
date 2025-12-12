// hooks/useSafeStore.js - Hydration-safe wrapper from docs
'use client'
import { useState, useEffect } from 'react'

export const useSafeStore = (store, callback) => {
  const result = store(callback)
  const [data, setData] = useState()

  useEffect(() => {
    setData(result)
    console.log(result)
  }, [result])

  return data
}

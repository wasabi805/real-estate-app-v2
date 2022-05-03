import React, { useContext, useState } from 'react'
import AppContext from 'context/appContext'
import { useRouter } from 'next/router'

const useRoute = (appSlices) => {
  const router = useRouter()
  const path = '/city/state'

  const handleRoute = (data, id) => {
    console.log('what is id', id)

    console.log('what is data', data)
    console.log('what is appSlices', appSlices)
  }

  return { handleRoute }
}

export default useRoute

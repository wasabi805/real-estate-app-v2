import React, { useContext, useEffect } from 'react'
import AppContext from 'context/appContext'

const CityDetails = () => {
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext

  useEffect(() => {
    console.log('CITY PAGE LOADED', state)
  }, [])

  return <div>This is the city page</div>
}

export default CityDetails

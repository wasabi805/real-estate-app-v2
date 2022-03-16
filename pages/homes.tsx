import React, { useEffect, useContext } from 'react'
import AppContext from 'context/appContext'

import PropertySearchBar from '@components/PropertySeachBar'

const Homes = () => {
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext
  const { search } = state

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <PropertySearchBar />
        <button>Button One</button>
        <button>Button Two</button>
        <button>Button Three</button>
        <button>Button Four</button>
      </div>
      THE HOMES PAGE
    </div>
  )
}

export default Homes

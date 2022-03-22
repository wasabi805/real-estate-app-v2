import React, { useContext } from 'react'
import AppContext from 'context/appContext'

const SelectedHome = () => {
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext
  const { searchResults } = state
  console.log('state from SELECTED HOME', state)
  const selectedHome = state.listingTable.currentHome

  return <div>The selected home</div>
}
export default SelectedHome

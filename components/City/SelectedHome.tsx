import React, { useContext } from 'react'
import Image from 'next/image'
import fullHouse from 'public/fullHouse.jpg'
import AppContext from 'context/appContext'
import { SelectedHomesContainer } from 'components/City/styles'

const SelectedHome = () => {
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext
  const { searchResults, listingTable } = state

  const selectedHome = state.listingTable.currentHome

  console.log('state from SELECTED HOME', selectedHome)
  console.log('state loaded', state)

  return (
    <>
      {listingTable.isTableView && (
        <SelectedHomesContainer>
          The selected home!!!!!!
          <div style={{ width: '25%' }}>
            <Image alt="fullHouse" src={fullHouse} />
          </div>
        </SelectedHomesContainer>
      )}
    </>
  )
}
export default SelectedHome

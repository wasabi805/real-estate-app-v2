import React, { useContext, useState, useEffect } from 'react'
import Image from 'next/image'
import fullHouse from 'public/fullHouse.jpg'
import AppContext from 'context/appContext'
import { SelectedHomesContainer } from 'components/City/styles'

const SelectedHome = () => {
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext
  const { searchResults, listingTable } = state

  const selectedHomeId = state.listingTable.currentHome
  const allHomes = searchResults.data.listings

  console.log('state loaded', state)
  console.log('what is selectedHomeId', selectedHomeId)
  // console.log( allHomes.filter( home=> home.property_id  === selectedHomeId), 'YYYYY' )

  const selectedHome = allHomes.filter(
    (home) => state.listingTable.currentHome[0] === home.property_id
  )
  console.log(selectedHome)
  return (
    <>
      {listingTable.isTableView && (
        <SelectedHomesContainer>
          The selected home!!!!!!
          <div style={{ width: '25%' }}>
            <img alt="fullHouse" src={selectedHome[0].photo} />
          </div>
        </SelectedHomesContainer>
      )}
    </>
  )
}
export default SelectedHome

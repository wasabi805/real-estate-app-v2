import React, { useContext } from 'react'
import AppContext from 'context/appContext'
import Card from '@pages/City/components/ListingsColumn/ListingCards/Card'
import { Ilisting } from 'actions/propertySearchBarActions/interface'
import { ListingsCardWrapper } from '@pages/City/components/ListingsColumn/ListingCards/styles'

const ListingCards = () => {
  const appContext = useContext(AppContext)
  const { state } = appContext
  const { searchResults } = state

  return (
    <ListingsCardWrapper>
      {searchResults.data.props.listings.map((house: Ilisting) => (
        <Card
          key={house.property_id}
          className={'listing-card'}
          houseData={house}
        />
      ))}
    </ListingsCardWrapper>
  )
}

export default React.memo(ListingCards)

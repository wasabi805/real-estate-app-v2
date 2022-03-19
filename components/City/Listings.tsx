import React, { useContext, useEffect } from 'react'
import AppContext from 'context/appContext'
import * as ListingsSortFilterActions from 'actions/listingsSortFilterActions'
import { Col, Tabs } from 'antd'
import { ListingsContainer } from './styles'
import SortByOptionsMenu from './SortByOptionsMenu'
import ListingCard from './ListingCard'

const { sortListings } = ListingsSortFilterActions
const { TabPane } = Tabs

const Listings = () => {
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext
  const { searchResults } = state

  useEffect(() => {
    if (state.sortAndFilter.isAscending !== null) {
      dispatch(sortListings(state.sortAndFilter, state.searchResults))
    }
  }, [state.sortAndFilter.isAscending])

  return (
    <ListingsContainer className={'listings-container'}>
      <SortByOptionsMenu />

      <Col span={24} className='listings-card-col'>
        <Tabs
          className={'photo-and-table-tab'}
          onTabClick={(key) => console.log(key)}
        >
          <TabPane tab="Photos" key="Photos">
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {searchResults.data.listings.map((house) => (
                <ListingCard key={house.property_id} houseData={house} />
              ))}
            </div>
          </TabPane>

          <TabPane tab="Table" key="Table">
            <div>Tables</div>
          </TabPane>
        </Tabs>{' '}
      </Col>
    </ListingsContainer>
  )
}

export default Listings

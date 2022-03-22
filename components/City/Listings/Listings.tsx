import React, { useContext, useEffect } from 'react'
import AppContext from 'context/appContext'
import * as ListingsSortFilterActions from 'actions/listingsSortFilterActions'
import { Col, Tabs } from 'antd'
import { ListingsContainer } from './styles'
import { SortByOptionsMenu } from 'components/City/Listings/SortAndFilter_Menus_Tabs'
import ListingCard from './ListingCards/ListingCard'
import { ListingTable } from './ListingsTable/ListingsTable'
import { Ilisting } from 'actions/propertySearchBarActions/interface'

const { sortListings } = ListingsSortFilterActions
const { TabPane } = Tabs

const Listings: React.FC = () => {
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext
  const { searchResults, sortAndFilter } = state

  useEffect(() => {
    if (state.sortAndFilter.isAscending !== null) {
      dispatch(sortListings(sortAndFilter, searchResults))
    }
  }, [sortAndFilter.isAscending])

  return (
    <ListingsContainer className={'listings-container'}>
      <SortByOptionsMenu />

      <Col span={24} className="listings-card-col">
        <Tabs
          className={'photo-and-table-tab'}
          onTabClick={(key) => console.log(key)}
        >
          {/* LISTINGS PRESENTED WITH CARDS VIEW */}
          <TabPane tab="Photos" key="Photos">
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {searchResults.data.listings.map((house: Ilisting) => (
                <ListingCard key={house.property_id} houseData={house} />
              ))}
            </div>
          </TabPane>

          {/* LISTINGS PRESENTED WITH TABLE VIEW */}
          <TabPane tab="Table" key="Table">
            <ListingTable />
          </TabPane>
        </Tabs>{' '}
      </Col>
    </ListingsContainer>
  )
}

export default Listings

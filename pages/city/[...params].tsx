import React, { useContext, useEffect, useState } from 'react'
import AppContext from 'context/appContext'
import Image from 'next/image'
import 'antd/dist/antd.css'
import { CityWrapper } from './styles'
import { MapColumnContainer, ListingsColumnContainer } from './styles'
import Listings from '@pages/city/components/Listings'
import PropertySearchBar from '@components/PropertySeachBar'
import mockMap from 'public/mockMap.jpeg'
import { FilterDropdownsRow } from '@pages/city/components/FilterDropdownsRow'
import * as FilterActions from 'actions/ListingsActions/FilterActions'
import { useRouter } from 'next/router'
import useDebounce from '@hooks/useDebounce'
import { formatHomeType, forSaleSoldRentCategory, getBedsMinAndMax, bathsCategory } from 'utils'

const { resetFilterButtonClicked } = FilterActions

import { Row, Col } from 'antd'

const City = (props) => {
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext

  const router = useRouter()

  //Price Field
  useDebounce(()=>{
    //TODO : make api call with min and max prices
    alert('price changed')
    const currentFilters = state.listings.filters
    const { homeType, forSaleRentSold, price } = currentFilters

    console.log('what is homeType, forSaleRentSold, price', {homeType, forSaleRentSold, price})


  } , 2000, [
    state.listings.filters.price.minField,
    state.listings.filters.price.maxField,
  ])

  // Filter buttons clicked
  useDebounce(
    () => {
      if (state.listings.filters.filterButtonClicked) {
        //  Flip the flag back to false
        dispatch(resetFilterButtonClicked())
        //  Change the url to include queries
    
        //  GRAB THE FILTERS
        const currentFilters = state.listings.filters
        const { homeType, forSaleRentSold, price, bedsBaths } = currentFilters
        const {minBeds, maxBeds} = getBedsMinAndMax(bedsBaths.currentRange)

        const queryValues = {
          status: forSaleSoldRentCategory(forSaleRentSold.filterBy[0]),
          homeType: formatHomeType(homeType.newSelected),
          "min-price": price.minField,
          "max-price": price.maxField,
          "min-beds" : minBeds,
          "max-beds" : maxBeds,
          "min-baths" : bathsCategory(bedsBaths.currentBaths),
        }

        const queryString = Object.entries(queryValues)
          .reduce((acc, [key, val]) => {
            return val ? acc + `${key}=${val}&` : acc
          }, '')
          .slice(0, -1)


          console.log('what is queryString', queryString)

        /* NOTE Have to use router.query.params to build the url otherwise any type of url string manipulation will append instead of replace the filter values to the url */
        const url = `${router.query.params[0]}/${router.query.params[1]}/filters?${queryString}`
        router.push(url)
      }
    },
    3000,
    [state.listings.filters.filterButtonClicked]
  )

  return (
    <CityWrapper>
      <Row>
        <Col>
          <PropertySearchBar />
        </Col>
      </Row>
      <Row>
        <MapColumnContainer span={14}>
          <Image src={mockMap} alt="the-five-kingdoms" />
        </MapColumnContainer>

        <ListingsColumnContainer span={10}>
          <div>
            <h2>Santa Monica Homes For Sale</h2>
          </div>
          <FilterDropdownsRow />
          <Listings />
        </ListingsColumnContainer>
      </Row>
    </CityWrapper>
  )
}

export default City

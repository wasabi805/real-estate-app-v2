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

import { formatHomeType, forSaleSoldRentCategory } from 'utils'

const { resetFilterButtonClicked } = FilterActions

import { Row, Col } from 'antd'

const City = (props) => {
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext

  const router = useRouter()

  useEffect(() => {
    if (state.listings.filters.filterButtonClicked) {
      //TODO 1: Flip the flag back to false
      dispatch(resetFilterButtonClicked())
      //TODO 2: Change the url to include queries

      //GRAB THE FILTERS
      const currentFilters = state.listings.filters
      const { homeType, forSaleRentSold } = currentFilters

      // const formatHomeType = (arr : string[])=> {
      //   const homeTypes = arr.reduce((acc, str)=> acc + homeTypeCategory(str) + '+' , '')
      //   return homeTypes.slice(0,-1)
      // }

      const queryValues = {
        // hometype: homeTypeCategory(homeType.selected),
        homeType : formatHomeType(homeType.newSelected),
        status: forSaleSoldRentCategory(forSaleRentSold.filterBy[0]),
      }

      const queryString = Object.entries(queryValues)
        .reduce((acc, [key, val]) => {
          return val ? acc + `${key}=${val}&` : acc
        }, '')
        .slice(0, -1)

      /* NOTE Have to use router.query.params to build the url otherwise any type of url string manipulation will append instead of replace the filter values to the url */
      const url = `${router.query.params[0]}/${router.query.params[1]}/filters?${queryString}`
      router.push(url)
    }
  }, [state.listings.filters.filterButtonClicked])

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

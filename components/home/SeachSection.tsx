import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import AppContext from 'context/appContext'
import * as SearchActions from 'actions/searchActions'
import SectionContainer from '@components/common/SectionContainer'

import img from 'images/banner-living-room-teal_1000.jpg'
import styled from '@emotion/styled'

import PropertySearchBar from '@components/PropertySeachBar'
import {
  SearchSectionContentStyle,
  SearchSectionHeaderStyle,
} from '@components/PropertySeachBar/styles'

const { updateStateWithSearchResults } = SearchActions

const BackgroundImage = styled.div(({ children }) => {
  return {
    position: 'absolute',
    backgroundImage: `url(${img.src})`,
    height: '100%',
    width: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '60% bottom',
    zIndex: '0',
  }
})

const SearchSection: React.FC = () => {
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext
  const router = useRouter()

  console.log('what is state when loads', state)
  // UNCOMMENT TO ALLOW LISTINGS TO COME FROM API and NOT MOCKDATA

  // useEffect(() => {
  //   if (state.fetchProperty) {
  //     handleFetchPropertyData()
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [state.fetchProperty])

  const handleFetchPropertyData = async () => {
    await axios
      .get('http://localhost:3000/api/realtor', {
        params: {
          location: state.search.value,
          isAutoComplete: state.search.isAutoComplete,
        },
      })
      .then((response) => {
        const { city, state } = response.data.meta.tracking_params
        console.log(
          { response },
          'AutoComplete results or Suggested places from google api'
        )
        // update state with search results
        console.log('what is this ', response.data)
        dispatch(updateStateWithSearchResults(response.data))
        router.push(`/city/${city}/${state}`)
      })
  }

  return (
    <SectionContainer>
      {console.log('what is state', state)}
      <div className={SearchSectionContentStyle}>
        <h3 className={SearchSectionHeaderStyle}>Find a home!</h3>
        <PropertySearchBar />
      </div>
      <BackgroundImage />
    </SectionContainer>
  )
}

export default SearchSection

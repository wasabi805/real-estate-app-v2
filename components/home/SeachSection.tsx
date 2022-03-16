import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import AppContext from 'context/appContext'

import SectionContainer from '@components/common/SectionContainer'

import img from 'images/banner-living-room-teal_1000.jpg'
import styled from '@emotion/styled'

import PropertySearchBar from '@components/PropertySeachBar'
import {
  SearchSectionContentStyle,
  SearchSectionHeaderStyle,
} from '@components/PropertySeachBar/styles'

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
  const { search } = state

  useEffect(() => {
    if (state.fetchProperty) {
      handleFetchPropertyData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.fetchProperty])

  const handleFetchPropertyData = async () => {
    await axios
      .get('http://localhost:3000/api/realtor', {
        params: {
          location: state.search.value,
          isAutoComplete: state.search.isAutoComplete,
        },
      })
      .then((resp) =>
        console.log(
          { resp },
          'AutoComplete results or Suggested places from google api'
        )
      )
  }

  return (
    <SectionContainer>
      <div className={SearchSectionContentStyle}>
        <h3 className={SearchSectionHeaderStyle}>Find a home!</h3>
        <PropertySearchBar />
      </div>
      <BackgroundImage />
    </SectionContainer>
  )
}

export default SearchSection

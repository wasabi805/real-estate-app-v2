import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import AppContext from 'context/appContext'
import * as SearchActions from 'actions/propertySearchBarActions'
import SectionContainer from '@components/_common/SectionContainer'

import img from 'images/banner-living-room-teal_1000.jpg'
import styled from '@emotion/styled'

import PropertySearchBar from '@components/PropertySeachBar'
import {
  SearchSectionContentStyle,
  SearchSectionHeaderStyle,
} from '@components/PropertySeachBar/styles'

import { logAutoCompleteResp } from 'utils'
import { stat } from 'fs'

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

  useEffect(()=>{
    console.log('IS IT LOADING?' , state.isLoading)
  },[state.isLoading])

  // UNCOMMENT TO ALLOW LISTINGS TO COME FROM API and NOT MOCKDATA
  // console.log('what is state when loaded?', state.search.isAutoComplete)
  // useEffect(() => {
  //   if (state.search.isAutoComplete) {
  //     handleFetchPropertyData()
  //     alert('go to city')
  //     console.log('what is stateUpdates', state)
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [state.search.isAutoComplete])

  // const handleFetchPropertyData = async () => {
  //   await axios
  //     .get('http://localhost:3000/api/realtor', {
  //       params: {
  //         location: state.search.value,
  //         isAutoComplete: state.search.isAutoComplete,
  //       },
  //     })
  //     .then((response) => {
  //       console.log('what is the response??????????', response)

  //       const { city, state } = response.data.meta.tracking_params
  //       const { searchCityState } = response.data.meta.tracking_params

  //       console.log({city, state} , 'ANY UPDATES')
  //       logAutoCompleteResp({ response })
  //       // update state with search results

  //       if ((state && city) && (state!=='noResult' && city !== 'noResult') ) {
  //         dispatch(
  //           updateStateWithSearchResults({
  //             data: response.data,
  //             city: city,
  //             state: state,
  //           })
  //         )
  //         return router.push(`/city/${city}/${state}`)
  //       }
  //     })
  // }

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

export default React.memo(SearchSection)

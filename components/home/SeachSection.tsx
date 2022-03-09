import React, { useContext } from 'react'
import AppContext from 'context/appContext'
import SectionContainer from '@components/common/SectionContainer'

import img from 'images/banner-living-room-teal_1000.jpg'
import styled from '@emotion/styled'

import Searchbar from 'components/common/Searchbar'
import { SEARCH_PLACEHOLDER } from '../../strings'
import * as SearchActions from 'actions/searchActions'
const { SET_SEARCH_FIELD, setSearchField } = SearchActions

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

  const handleHomeSearch = () => {}
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    dispatch(setSearchField(value))
  }

  return (
    <SectionContainer backgroundImage={img}>
      <div style={{ zIndex: '1000' }}>
        <h3>Find a home!</h3>

        <Searchbar
          placeHolder={SEARCH_PLACEHOLDER}
          onSearch={handleHomeSearch}
          onChange={handleSearchInputChange}
          name={'seach-input'}
          value={search.value}
        />
      </div>
      <BackgroundImage />
    </SectionContainer>
  )
}

export default SearchSection

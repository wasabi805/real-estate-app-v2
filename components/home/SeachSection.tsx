import React from 'react'
import SectionContainer from '@components/common/SectionContainer'

import img from 'images/banner-living-room-teal_1000.jpg'
import styled from '@emotion/styled'

import PropertySearchBar from '@components/PropertySeachBar'


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

  return (
    <SectionContainer backgroundImage={img}>
      <div style={{ zIndex: '1000' }}>
        <h3>Find a home!</h3>

        <PropertySearchBar/>
      </div>
      <BackgroundImage />
    </SectionContainer>
  )
}

export default SearchSection

import React from 'react'
import SectionContainer from '@components/_common/SectionContainer'

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

const Landing: React.FC = (props) => {
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

export default Landing

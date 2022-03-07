import React from 'react'
import SectionContainer from '@components/common/SectionContainer'
import Image from 'next/image'
import img from 'images/banner-living-room-teal_1000.jpg'
import styled from '@emotion/styled'



const BackgroundImage = styled.div(({ children }) => {
    return {
    position: 'absolute',
      backgroundImage: `url(${img.src})`,
      height: '100%',
      width: '100%',
      backgroundSize: 'cover',
      backgroundRepeat:'no-repeat',
      backgroundPosition:'60% bottom'
    }
  })


const SearchSection = () => {
  return (

      <SectionContainer backgroundImage={img}>
         <BackgroundImage>
             hello again
         </BackgroundImage>
        </SectionContainer>
  
  )
}

export default SearchSection

import React from 'react'
import axios from 'axios'
import SectionContainer from '@components/common/SectionContainer'
import * as SearchActions from 'actions/searchActions'
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
  const handleFetchProperties = async () => {
    const res = await axios.get('http://localhost:3000/api/realtor')

    console.log(res)
  }

  return (
    <SectionContainer>
      <div className={SearchSectionContentStyle}>
        <h3 className={SearchSectionHeaderStyle}>Find a home!</h3>
        <PropertySearchBar callsOnLocationSelected={handleFetchProperties} />
      </div>
      <BackgroundImage />
    </SectionContainer>
  )
}

export default SearchSection

export const getStaticProps = async (req, res) => {
  try {
    var options = {
      method: 'GET',
      url: 'https://realtor.p.rapidapi.com/locations/auto-complete',
      params: { input: 'new york' },
      headers: {
        'x-rapidapi-host': 'realtor.p.rapidapi.com',
        'x-rapidapi-key': process.env.REALTOR_API_KEY,
      },
    }

    return axios
      .request(options)
      .then(function (response) {
        console.log(response.data)
        res.status(203).send(response.data)
      })
      .catch(function (error) {
        console.error(error)
      })
  } catch (err) {}
}

import React, { useContext } from 'react'
import axios from 'axios'
import * as SearchActions from 'actions/searchActions'
import AppContext from 'context/appContext'

import SectionContainer from '@components/common/SectionContainer'

import img from 'images/banner-living-room-teal_1000.jpg'
import styled from '@emotion/styled'

import realtorApi from '@pages/api/realtor'
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
  console.log(state, '777777')

  // await axios.get('http://localhost:3000/api/realtor',{
  //     params:{
  //       address: 'bar'
  //     }
  //   }).then(resp=> console.log({resp}, '$$$$$$'))

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

export const getStaticProps = async (req, res) => {
  console.log(req, 'is it here in the back end?')
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

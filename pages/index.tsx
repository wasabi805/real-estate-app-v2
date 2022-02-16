import type { NextPage } from 'next'
import React, { useReducer } from 'react'
import appReducer, { initialState } from 'reducers/appReducer'
import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'
import { JUST_A_TEST_CONST } from 'constants'
import PageLayout, { TESTCOMP1, TESTCOMP2 } from '../components/common/Layout'

interface IHomeProps {
  res: any
}
const Home: NextPage<IHomeProps> = ({ res }) => {
  console.log(res)
  console.log(JUST_A_TEST_CONST)
  return (
    <PageLayout>
      <TESTCOMP1 />
      <TESTCOMP2 />
    </PageLayout>
  )
}
export default Home

export const getStaticProps = async () => {
  console.log(process.env.REALTOR_API_KEY)

  var options = {
    method: 'GET',
    url: 'https://realtor.p.rapidapi.com/locations/auto-complete',
    params: { input: 'new york' },
    headers: {
      'x-rapidapi-host': 'realtor.p.rapidapi.com',
      'x-rapidapi-key': process.env.REALTOR_API_KEY,
    },
  }

  // const res = await axios
  //   .request(options)
  //   .then(function (response) {
  //     console.log(response.data)
  //     return response.data
  //   })
  //   .catch(function (error) {
  //     console.error(error)
  //   })

  const res = 'temp value'

  return {
    props: {
      res: res,
    },
  }
}

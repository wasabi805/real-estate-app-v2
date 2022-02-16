import type { NextPage } from 'next'
import React, { useContext } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'
import { JUST_A_TEST_CONST } from 'constants'
import PageLayout, { TESTCOMP1, TESTCOMP2 } from '../components/common/Layout'
import AppContext from '../context/appContext'

interface IHomeProps {
  res: any
}
const Home: NextPage<IHomeProps> = ({ res }) => {
  console.log(res)
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext
  console.log({ state, dispatch })
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

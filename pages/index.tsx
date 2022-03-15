import type { NextPage } from 'next'
import axios from 'axos'
import { useUser } from '@auth0/nextjs-auth0'
import React, { useContext } from 'react'
import { TESTCOMP1, TESTCOMP2 } from '../components/common/Layout'
import AppContext from '../context/appContext'
import { SearchSection } from '../components/home'

interface IHomeProps {
  res: any
}
const Home: NextPage<IHomeProps> = ({ res }) => {
  const { user, error, isLoading } = useUser()

  // console.log('what is res', res)

  if (isLoading) return <div>Loading...</div>
  if (error)
    return (
      <div>
        <h3>from index.tsx</h3>
        {error.message}
      </div>
    )

  if (user) {
    console.log({
      user: user,
    })
  }

  return (
    <>
      {/* <GooglePlacesScript /> */}
      <SearchSection />
      <TESTCOMP1 />
      <TESTCOMP2 />
    </>
  )
}
export default Home

export const getStaticProps = async () => {
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

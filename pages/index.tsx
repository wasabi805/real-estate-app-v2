import type { NextPage } from 'next'
import axios from 'axios'
import { useUser } from '@auth0/nextjs-auth0'
import React, { useContext } from 'react'
import { TESTCOMP1, TESTCOMP2 } from '../components/_common/Layout'
import AppContext from '../context/appContext'
import Landing from './landing'

interface IHomeProps {
  res: any
}
const Home: NextPage<IHomeProps> = (props) => {
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
      <Landing props={props} />
      <TESTCOMP1 />
      <TESTCOMP2 />
    </>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      message: 'foo!',
    },
  }
}

export default Home

import type { NextPage } from 'next'
import { useUser } from '@auth0/nextjs-auth0'
import React, { useContext } from 'react'
import { TESTCOMP1, TESTCOMP2 } from '../components/common/Layout'
import AppContext from '../context/appContext'
import { SearchSection } from '../components/home'

import { useExternalScript } from 'hooks/useExternalScript'
import { useInitAutoComplete } from 'hooks/useInitAutoComplete'

interface IHomeProps {
  res: any
}
const Home: NextPage<IHomeProps> = ({ res }) => {
  const { user, error, isLoading } = useUser()

  // const externalScript = "<external-script-url>";

  // const externalScript =`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&libraries=places`
  // const externalScript =`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&libraries=places&callback=test`
  const externalScript = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&libraries=places&callback=initAutoComplete`
  const scriptState = useExternalScript(externalScript)
  const initMapState = useInitAutoComplete('google-map')
  console.log(initMapState)
  useInitAutoComplete()
  React.useEffect(() => {
    console.log('what is the state to the hook ', scriptState)
  }, [scriptState])

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
      user,
    })
  }

  return (
    <div>
      {scriptState === 'ready' && <SearchSection />}
      <TESTCOMP1 />
      <TESTCOMP2 />
    </div>
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

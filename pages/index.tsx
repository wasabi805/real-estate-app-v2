import type { NextPage } from 'next'
import { useUser } from '@auth0/nextjs-auth0'
import React, { useContext } from 'react'
import { TESTCOMP1, TESTCOMP2 } from '../components/common/Layout'
import AppContext from '../context/appContext'
import { SearchSection } from '../components/home'

import Script from 'next/script'

interface IHomeProps {
  res: any
}
const Home: NextPage<IHomeProps> = ({ res }) => {
  const { user, error, isLoading } = useUser()

  // console.log('what is res', res)

  /**
   * expected behavior to clear out env at runtime | see : https://github.com/vercel/next.js/issues/26582
   */
  const googleApiKey = String(process.env.NEXT_PUBLIC_API_KEY)

  const externalScript = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places&callback=initAutoComplete`
  
  
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
      <Script id="initAutoComplete">
        {`let autocomplete; 
             function initAutoComplete(){
                 autocomplete= new google.maps.places.Autocomplete(
                     document.getElementById('autocomplete'),
                     { 
                         componentRestrictions:{
                             'country':['US']
                         },
                         fields:['place_id', 'geometry','name']
                     }); 
             }`}
      </Script>
      <Script src={externalScript} />

      <SearchSection />
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

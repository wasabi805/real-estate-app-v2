import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { UserProvider } from '@auth0/nextjs-auth0'
import React, { useReducer, useEffect, useRef, useState } from 'react'
import AppContext from 'context/appContext'
import appReducer from 'reducers/appReducer'
import initialState from 'reducers/initialState'
import * as GlobalActions from 'actions/GlobalActions'
import PageLayout, { TESTCOMP1, TESTCOMP2 } from '../components/_common/Layout'
import { HistoryProvider, useHistory } from 'hooks/useHistory'
import { useRouter } from 'next/router'
import getListings from '@pages/api/getListings'
import {
  containsSubString,
} from 'utils'
import axios from 'axios'

interface IAppProps extends AppProps {
  AppData: any
}

const { setPreviousState } = GlobalActions

function App({ Component, pageProps, AppData }: IAppProps) {
  const router = useRouter()

  const [state, dispatch] = useReducer(appReducer, initialState)
  const [currentPath, setCurrentPath] = useState(router.asPath)



  useEffect(() => {
    console.log('what are changes in router', router.asPath)


    if(currentPath !==router.asPath){
  
      //CITY PAGE
      if(containsSubString(router.asPath, 'city')){
        const { params } = router?.query
  
        const getData = async()=>{
          const res = await axios.get(`http://localhost:3000/api/getListings?city=${params[0]}&state=${params[1]}`)
          console.log('what is the res in getData', res)
          alert('dispatch changes')
          //TODO: call action here to update the state
          
        }

        getData()
    
      }      
    }


  }, [router.asPath])

  // useEffect(() => {
  //   console.log('State Updated', state)
  //   if (state.searchResults.routeTo) {
  //     const url = state.searchResults.routeTo
  //     router.push(url)
  //   }
  // }, [state.searchResults.routeTo])

  return (
    <UserProvider>
      <AppContext.Provider
        value={{
          state,
          dispatch,
        }}
      >
        {/* <HistoryProvider> */}
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
        {/* </HistoryProvider> */}
      </AppContext.Provider>
    </UserProvider>
  )
}

export default App

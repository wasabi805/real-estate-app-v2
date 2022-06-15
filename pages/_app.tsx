import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { UserProvider } from '@auth0/nextjs-auth0'
import React, { useReducer, useEffect, useRef, useState } from 'react'
import AppContext from 'context/appContext'
import appReducer from 'reducers/appReducer'
import initialState from 'reducers/initialState'
import * as GlobalActions from 'actions/GlobalActions'
import PageLayout from '../components/_common/Layout'
import { useRouter } from 'next/router'
import { containsSubString } from 'utils'
import axios from 'axios'

interface IAppProps extends AppProps {
  AppData: any
}

const { setPreviousState } = GlobalActions
import useRehydrate from '@hooks/useRehydrate'
import usePrevious from '@hooks/usePrevious'
import useUpdateEffect from '@hooks/useUpdateEffect'

function App({ Component, pageProps, AppData }: IAppProps) {
  const router = useRouter()

  const [state, dispatch] = useReducer(appReducer, initialState)
  const [currentPath, setCurrentPath] = useState(router.asPath)

  // if page is refreshed , use url to update previous state
  useRehydrate(router.asPath, state)

  const currSearchResults = state.searchResults
  const prevSearchResults = usePrevious(state.searchResults)

  useUpdateEffect(
    () => alert('do now route to the city page'),
    [currSearchResults, prevSearchResults]
  )

  useEffect(() => {
    console.log('what are changes in router', router.asPath)

    if (currentPath !== router.asPath) {
      console.log({ currentPath, asPath: router.asPath, router })
      //CITY PAGE
      if (containsSubString(router.asPath, 'city')) {
        const { params } = router?.query

        const filters = Object.fromEntries(
          Object.entries(router.query).filter(([key]) => {
            return key !== 'params'
          })
        )

        Object.entries(filters).reduce((acc, [key, val]) => {
          console.log({ acc, key, val })
        }, '')

        const hasFilters = Object.keys(filters).length > 0

        const getData = async () => {
          const res = hasFilters
            ? await axios.get(
                `http://localhost:3000/api/getListings?city=${
                  params[0]
                }&state=${params[1]}&filters=${JSON.stringify(filters)}`
              )
            : await axios.get(
                `http://localhost:3000/api/getListings?city=${params[0]}&state=${params[1]}`
              )
          console.log('what is the res in getData', res)
          alert('dispatch changes')
          //TODO: call action here to update the state
        }

        getData()
      }
    }
  }, [router.asPath])

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

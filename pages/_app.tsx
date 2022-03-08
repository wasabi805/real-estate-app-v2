import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UserProvider } from '@auth0/nextjs-auth0'
import React, { useReducer } from 'react'
import AppContext from 'context/appContext'
import appReducer, { initialState } from 'reducers/appReducer'
import PageLayout, { TESTCOMP1, TESTCOMP2 } from '../components/common/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <UserProvider>
      <AppContext.Provider
        value={{
          state,
          dispatch,
        }}
      >
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </AppContext.Provider>
    </UserProvider>
  )
}

export default MyApp

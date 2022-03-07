import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UserProvider } from '@auth0/nextjs-auth0'
import React, { useReducer } from 'react'
import AppContext from 'context/appContext'
import appReducer, { initialState } from 'reducers/appReducer'

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
        <Component {...pageProps} />
      </AppContext.Provider>
    </UserProvider>
  )
}

export default MyApp

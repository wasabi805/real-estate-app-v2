import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, { useReducer } from 'react'
import AppContext from 'context/appContext'
import appReducer, { initialState } from 'reducers/appReducer'

function MyApp({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <>
      <AppContext.Provider
        value={{
          state,
          dispatch,
        }}
      >
        <div>Im on everypage</div>
        <Component {...pageProps} />
      </AppContext.Provider>
    </>
  )
}

export default MyApp

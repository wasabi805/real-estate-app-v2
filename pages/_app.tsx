import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { UserProvider } from '@auth0/nextjs-auth0'
import React, { useReducer } from 'react'
import AppContext from 'context/appContext'
import appReducer from 'reducers/appReducer'
import initialState from 'reducers/initialState'
import PageLayout, { TESTCOMP1, TESTCOMP2 } from '../components/_common/Layout'
import { HistoryProvider } from 'hooks/useHistory'

interface IAppProps extends AppProps {
  AppData: any
}

function App({ Component, pageProps, AppData }: IAppProps) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <UserProvider>
      <AppContext.Provider
        value={{
          state,
          dispatch,
        }}
      >
        <HistoryProvider>
          <PageLayout>
            <Component {...pageProps} />
          </PageLayout>
        </HistoryProvider>
      </AppContext.Provider>
    </UserProvider>
  )
}

export default App

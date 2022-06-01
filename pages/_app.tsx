import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { UserProvider } from '@auth0/nextjs-auth0'
import React, { useReducer, useEffect } from 'react'
import AppContext from 'context/appContext'
import appReducer from 'reducers/appReducer'
import initialState from 'reducers/initialState'
import * as GlobalActions from 'actions/GlobalActions'
import PageLayout, { TESTCOMP1, TESTCOMP2 } from '../components/_common/Layout'
import { HistoryProvider, useHistory } from 'hooks/useHistory'
import { useRouter } from 'next/router'

interface IAppProps extends AppProps {
  AppData: any
}

const { setPreviousState } = GlobalActions

function App({ Component, pageProps, AppData }: IAppProps) {
  const router = useRouter()

  const [state, dispatch] = useReducer(appReducer, initialState)

  useEffect(() => {
    router.beforePopState((e) => {
      console.log('what is e', e.idx)
      const idx = e.idx - 2
      console.log('what is idx', idx)
      const prevStates =
        sessionStorage.history && JSON.parse(sessionStorage.history)
      const prevState = prevStates[idx]

      console.log('what is prevState', prevState)

      dispatch(setPreviousState(prevState))

      console.log(
        'what is sessionStorage at app',
        JSON.parse(sessionStorage.history)
      )
    })
  }, [router])

  useEffect(() => {
    console.log('what is initial session', sessionStorage)
  }, [])

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

import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { UserProvider } from '@auth0/nextjs-auth0'
import React, { useReducer, useEffect, useRef } from 'react'
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
     
      const idx = e.idx - 2
      
      const history = JSON.parse(sessionStorage.history)
      history.currentHistoryIdx = idx
      console.log('did history update', history)
      localStorage.setItem('history', JSON.stringify(history))

      const prevState = history.instances[idx]
      console.log('what is history', history)

      dispatch(setPreviousState(prevState))
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

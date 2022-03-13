import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UserProvider } from '@auth0/nextjs-auth0'
import React, { useReducer } from 'react'
import AppContext from 'context/appContext'
import appReducer, { initialState } from 'reducers/appReducer'
import PageLayout, { TESTCOMP1, TESTCOMP2 } from '../components/common/Layout'

export const getStaticProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  const data = await res.json()

  console.log(data)
  return {
    props: {
      ninjas: data,
    },
  }
}
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
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </AppContext.Provider>
    </UserProvider>
  )
}

App.getInitialProps = async () => {
  const req = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  const data = await req.json()
  return { AppData: data.results }
}

export default App

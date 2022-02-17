import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, { useReducer, useEffect } from 'react'
import AppContext from 'context/appContext'
import appReducer, { initialState } from 'reducers/appReducer'
import { makeServer } from 'mockServer';

function MyApp({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  if (process.env.NODE_ENV === 'development') {
    makeServer({ environment: 'development' });
  } 

  const getUsers = () => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => setNotes(data.users))
      .catch((error) => console.log('Error fetching users', error));
  };

  useEffect(()=>{
    console.log(getUsers())
  }, [])

  return (
    <>
      <AppContext.Provider
        value={{
          state,
          dispatch,
        }}
      >
        <Component {...pageProps} />
      </AppContext.Provider>
    </>
  )
}

export default MyApp

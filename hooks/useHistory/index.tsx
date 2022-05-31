import { useRouter } from 'next/router'
import React, { createContext, useState, useEffect, useContext } from 'react'
import AppContext from 'context/appContext'

interface IHistoryItem {
  path: string
  state: any
}
interface IuseHistory {
  history: IHistoryItem[]
  // setHistory(data: string[]): void
  setHistory(data: any): void
  back(): void
  push(): void
}

const HistoryContext = createContext<IuseHistory>({} as IuseHistory)

export const HistoryProvider: React.FC = ({ children }) => {
  const { asPath, push: pushRoute, pathname } = useRouter()

  const { state } = useContext(AppContext)

  const [historyState, setHistoryState] = useState([])
  console.log('what is historyState', historyState)
  console.log('what can i use in router', useRouter())

  function back() {
    for (let i = historyState.length - 2; i >= 0; i--) {
      const route = historyState[i]
      if (!route.includes('#') && route !== pathname) {
        pushRoute(route)

        // if you want to pop history on back
        const newHistory = historyState.slice(0, i)
        setHistoryState(newHistory)

        break
      }
    }
  }

  const push = ({ url }) => {
    console.log('what is url', url)
  }

  const historyItem = {
    url: asPath,
    state: state,
  }
  useEffect(() => {
    console.log('asPath', asPath)

    setHistoryState((previous) => [...previous, historyItem])
  }, [asPath])

  return (
    <HistoryContext.Provider
      value={{
        back,
        push,
        // history: historyState,
        // setHistory: setHistoryState,
      }}
    >
      {children}
    </HistoryContext.Provider>
  )
}

export function useHistory(): IuseHistory {
  const context = useContext(HistoryContext)
  return context
}

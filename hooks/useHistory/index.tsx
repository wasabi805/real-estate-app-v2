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
  // const { asPath, push: pushRoute, pathname } = useRouter()
  const router = useRouter()

  const { state } = useContext(AppContext)

  const [historyState, setHistoryState] = useState([])

  const historyItem = {
    url: router.asPath,
    state: state,
  }
  useEffect(() => {
    setHistoryState((previous) => [...previous, historyItem])
  }, [router.asPath])

  return (
    <HistoryContext.Provider
      value={{
        history: historyState,
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

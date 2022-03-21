import React, { createContext } from 'react'
import { initialState } from 'reducers/appReducer'
import { IAction } from 'actions/interface'

interface Istate {
  state: typeof initialState
  dispatch: React.Dispatch<IAction>
}

const AppContext = createContext<Istate>({
  state: initialState,
  dispatch: () => {},
})

export default AppContext

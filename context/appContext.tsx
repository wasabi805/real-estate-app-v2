import { createContext } from 'react'
import { IinitialState } from 'reducers/interface'
import { initialState } from 'reducers/appReducer'

const AppContext = createContext<IinitialState>(initialState)

export default AppContext

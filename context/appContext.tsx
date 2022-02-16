
import { createContext } from 'react'
import { IinitialState, initialState } from '../reducers/appReducer'

const AppContext = createContext<IinitialState>(initialState)

export default AppContext

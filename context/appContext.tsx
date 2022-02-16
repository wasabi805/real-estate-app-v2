import React from 'react'
import { createContext } from 'react'
import { IinitialState } from '../reducers/appReducer'

const AppContext = React.createContext<IinitialState | null>(null)

export default AppContext

import React from 'react'
import { render, screen } from '../../testUtils'
import HomePage from '@pages/index'

describe('Home Page', () => {
  it('should render the pahe', () => {
    render(<HomePage />)
  })
})

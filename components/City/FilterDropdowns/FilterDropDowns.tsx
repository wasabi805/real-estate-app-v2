import React from 'react'
import styled from '@emotion/styled'
import { Menu, Dropdown, Row, Divider } from 'antd'
import { FilterDropdownsContainer } from 'components/City/FilterDropdowns/styles'
import { DropDownMenuButton } from 'components/common/DropDownMenuButton'

const StyleDiv = styled.div``

const TestComponent = (props) => {
  console.log('did you recieve fake state', props)
  return (
    <StyleDiv>
      <p>{props.fakeState.foo.bar}</p>
    </StyleDiv>
  )
}

const fakeState = {
  foo: {
    bar: 'foo bar',
  },
}

const FilterDropdowns = () => {
  return (
    <FilterDropdownsContainer>
      <DropDownMenuButton
        buttonName={'testMe'}
        component={<TestComponent fakeState={fakeState} />}
      />
    </FilterDropdownsContainer>
  )
}

export default FilterDropdowns

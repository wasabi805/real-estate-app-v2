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

const fakeState2 = [
  { id: '1', name: 'eject', onClick: () => console.log('Ejection seats') },
  { id: '2', name: 'laser', onClick: () => console.log('fire laser') },
]

const FilterDropdowns = () => {
  return (
    <FilterDropdownsContainer>
      <DropDownMenuButton
        buttonName={'testMe'}
        menuList={fakeState2}
        // component={<TestComponent fakeState={fakeState} />}
      />
    </FilterDropdownsContainer>
  )
}

export default FilterDropdowns

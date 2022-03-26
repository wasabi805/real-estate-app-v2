import styled from '@emotion/styled'
import {Button} from 'antd'

export const FilterDropdownsContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: vertical;
  height: 4vh;
`
export const FilterButtonWrapper = styled(Button)`
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 1px solid blue;
  padding: 1em;
  margin-right: 1em;
  border-radius: 4px;
`

export const BedBathsContainer = styled.div`
  h3 {
    display: inline-block;
    color: red;
  }
`

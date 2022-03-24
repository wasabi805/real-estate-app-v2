import styled from '@emotion/styled'
import { ListingsTable } from 'components/City/Listings/ListingsTable'

export const ListingsTableContainer = styled.div`
  padding: 5rem;
`

const ListingTableHeaderContainer = () => {
  return (
    <div id="fixed-listing-header">
      <ListingsTable />
    </div>
  )
}

const ListingTableBodyContainer = () => {
  return (
    <div id="scrollable-listing-body">
      <ListingsTable />
    </div>
  )
}

/* NOTE: Work around for styling in orrder to break up the Table elements from Ant Design 
can be found in styled component SelectedHomesContainer  */
export const ListingsTableHeader = styled(ListingTableHeaderContainer)``
export const ListingsTableBody = styled(ListingTableBodyContainer)``

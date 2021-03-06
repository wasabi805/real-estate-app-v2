import styled from '@emotion/styled'

export const AllFiltersDrawerContainer = styled.div``

export const DrawerCotent = styled.div`
  .all-filters-drawer-row {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem;
    border-bottom: 1px solid lightgrey;
    h3 {
      flex: 0 0 auto;
    }
  }
  .all-filters-drawer-row.for-sale-rent-sold {
    .e1m7jdwn0 {
      button: first-of-type {
        border-radius: 8px 0 0 8px;
      }
      button: last-of-type {
        border-radius: 0 8px 8px 0;
      }
    }
  }

  .all-filters-drawer-row.price {
    .e1a75ba33 {
      padding: 0 4rem;
    }
  }
`

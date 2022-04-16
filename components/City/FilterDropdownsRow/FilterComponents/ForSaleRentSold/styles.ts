import styled from '@emotion/styled'

export const ForSaleRentSoldContainer = styled.div`
  width: 25rem;
`

export const SoldRadioWrapper = styled.div`
  [class^='ant-table-tbody'] {
    & tr {
      display: flex;
      width: 25rem;

      td: nth-of-type(1) {
        order: 3;
        // margin-left: auto;
      }
    }
  }

  [class^='ant-table-cell ant-table-row-expand-icon-cell'] {
    margin-left: auto;
  }
`

import styled from '@emotion/styled'

export const ForSaleRentSoldContainer = styled.div`
  //   width: 24rem;
`

export const SoldRadioWrapper = styled.div`
  [class^='ant-table-tbody'] {
    .ant-table-row {
      width: 25rem;
      display: flex;
      .ant-table-row-expand-icon-cell {
        order: 3;
        margin-left: auto;
      }
    }
  }

  [class^='ant-table-tbody'] .ant-table-row .ant-table-row-expand-icon-cell {
    background: transparent;
  }

  [class^='ant-table-tbody'] .ant-table-row .ant-table-selection-column {
    background: transparent;
  }

  [class^='ant-table-tbody'] .ant-table-row .ant-table-cell {
    background: transparent;
  }
`

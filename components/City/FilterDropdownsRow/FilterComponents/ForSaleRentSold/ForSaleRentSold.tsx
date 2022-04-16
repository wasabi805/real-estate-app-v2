import React, { useContext, useState } from 'react'
import AppContext from 'context/appContext'
import * as ListingsFilterActions from 'actions/listingsFilterActions'
import { Table } from 'antd'
import 'antd/dist/antd.css'
import {
  ForSaleRentSoldContainer,
  SoldRadioWrapper,
} from 'components/City/FilterDropdownsRow/FilterComponents/ForSaleRentSold/styles'
import { ForSaleRentSoldTableFormat } from 'components/City/FilterDropdownsRow/FilterComponents/ForSaleRentSold'

const { setFilterByPropertyType } = ListingsFilterActions

const ForSaleRentSold = () => {
  const { columns, saleRent, soldExpandable } = ForSaleRentSoldTableFormat

  const { state, dispatch } = useContext(AppContext)

  return (
    <ForSaleRentSoldContainer>
      <Table
        pagination={false}
        showHeader={false}
        rowSelection={{
          type: 'radio',
          selectedRowKeys: state.forSaleRentSold.filterBy,
        }}
        columns={columns}
        dataSource={saleRent}
        onRow={(record, rowIndex) => ({
          onClick: () => {
            dispatch(setFilterByPropertyType([record.key]))
          },
        })}
      />

      <SoldRadioWrapper>
        <Table
          pagination={false}
          showHeader={false}
          rowSelection={{
            type: 'radio',
            selectedRowKeys: state.forSaleRentSold.filterBy,
          }}
          columns={columns}
          dataSource={soldExpandable}
          onRow={(record, rowIndex) => ({
            onClick: () => {
              dispatch(setFilterByPropertyType([record.key]))
            },
          })}
          expandable={{
            expandedRowKeys: state.forSaleRentSold.filterBy,
            expandedRowRender: (record) => (
              <p style={{ margin: 0 }}>OTHER RADIO BUTTONS GO HERE</p>
            ),
            onExpand: (expanded, record) =>
              console.log('onExpand: ', record, expanded),
          }}
        />
      </SoldRadioWrapper>
    </ForSaleRentSoldContainer>
  )
}

export default ForSaleRentSold

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
import ButtonComp from '@components/_common/ButtonComp'

const { setFilterByPropertyType } = ListingsFilterActions

const ForSaleRentSold = () => {
  const {
    columns,
    saleRent,
    soldExpandable,
    soldDatePeriodColumn,
    soldDatePeriodRows,
  } = ForSaleRentSoldTableFormat

  const { state, dispatch } = useContext(AppContext)

  const ForSaleDateRange = () => {
    return (
      <div>
        <Table
          pagination={false}
          showHeader={false}
          columns={soldDatePeriodColumn}
          dataSource={soldDatePeriodRows}
          rowSelection={{
            type: 'radio',
            // selectedRowKeys: state.forSaleRentSold.filterBy,
          }}
        />
      </div>
    )
  }

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
            expandedRowRender: (record) => <ForSaleDateRange />,
            onExpand: (expanded, record) =>
              console.log('onExpand: ', record, expanded),
          }}
        />
      </SoldRadioWrapper>

      <ButtonComp
        instance={{ name: 'button-row' }}
        align="right"
        buttonGroup={[
          {
            text: 'Clear',
            onClick: () => console.log(' Clear clicked'),
          },
          {
            text: 'Done',
            onClick: () => console.log(' Done'),
            type: 'primary',
          },
        ]}
      />
    </ForSaleRentSoldContainer>
  )
}

export default ForSaleRentSold

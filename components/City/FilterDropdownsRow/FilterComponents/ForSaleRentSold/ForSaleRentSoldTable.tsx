import React, { useContext } from 'react'
import AppContext from 'context/appContext'

import * as ForSaleRentSoldActions from 'actions/listingsFilterActions/forSaleRentSoldActions'
import { Table } from 'antd'
import 'antd/dist/antd.css'
import {
  ForSaleRentSoldContainer,
  SoldRadioWrapper,
} from 'components/City/FilterDropdownsRow/FilterComponents/ForSaleRentSold/styles'
import { ForSaleRentSoldTableFormat } from 'components/City/FilterDropdownsRow/FilterComponents/ForSaleRentSold'

const { setFilterByPropertyType } = ForSaleRentSoldActions

const ForSaleRentSold = () => {
  const {
    columns,
    saleRent,
    soldExpandable,
    soldDatePeriodColumn,
    soldDatePeriodRows,
  } = ForSaleRentSoldTableFormat

  const { state, dispatch } = useContext(AppContext)

  const newColumns = [
    {
      title: 'Listing Category',
      dataIndex: 'listingFilterCategory',
    },
  ]

  console.log(
    state.listingsFilters?.forSaleRentSold?.filterBy,
    'filterBy FORSALTEREENTSOLDTABLE'
  )

  const newSaleRentRows = [
    {
      key: 'all-filters-btn-for-sale',
      // key: state.listingsFilters?.forSaleRentSold?.buttons[0].id,
      listingFilterCategory: 'For sale',
    },
    {
      key: 'all-filters-btn-for-rent',
      // key: state.listingsFilters?.forSaleRentSold?.buttons[1].id,
      listingFilterCategory: 'For rent',
    },
  ]

  const ForSaleDateRange = () => {
    return (
      <div>
        <Table
          pagination={false}
          showHeader={false}
          columns={newColumns}
          dataSource={newSaleRentRows}
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
      {/* TODO : step 1: setFilterByPropertyType */}
      <Table
        pagination={false}
        showHeader={false}
        rowSelection={{
          type: 'radio',
          selectedRowKeys: state.listingsFilters?.forSaleRentSold?.filterBy,
        }}
        columns={newColumns}
        dataSource={newSaleRentRows}
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
            selectedRowKeys: state.listingsFilters?.forSaleRentSold?.filterBy,
          }}
          columns={columns}
          dataSource={soldExpandable}
          onRow={(record, rowIndex) => ({
            onClick: () => {
              dispatch(setFilterByPropertyType([record.key]))
            },
          })}
          expandable={{
            expandedRowKeys: state.listingsFilters?.forSaleRentSold?.filterBy,
            expandedRowRender: (record) => <ForSaleDateRange />,
            onExpand: (expanded, record) =>
              console.log('onExpand: ', record, expanded),
          }}
        />
      </SoldRadioWrapper>
    </ForSaleRentSoldContainer>
  )
}

export default ForSaleRentSold

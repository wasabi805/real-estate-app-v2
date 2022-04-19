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

const { setFilterByPropertyType, setSoldDateRange } = ForSaleRentSoldActions

const ForSaleRentSold = () => {
  const { columns, saleRent, soldExpandable } = ForSaleRentSoldTableFormat

  const { state, dispatch } = useContext(AppContext)

  const newColumns = [
    {
      title: 'Listing Category',
      dataIndex: 'listingFilterCategory',
    },
  ]
  const newSaleRentRows = [
    {
      key: 'all-filters-btn-for-sale',
      listingFilterCategory: 'For sale',
    },
    {
      key: 'all-filters-btn-for-rent',
      listingFilterCategory: 'For rent',
    },
  ]

  const handleSoldDateRangeClick = (dateRange: any) => {
    dispatch(setSoldDateRange(dateRange))
  }

  const ForSaleDateRange = () => {
    return (
      <div>
        {console.log(
          'YEEEEE',
          state.listingsFilters?.forSaleRentSold?.soldDateRange
        )}
        <Table
          pagination={false}
          showHeader={false}
          columns={state.listingsFilters?.forSaleRentSold?.soldDateRangeColumns}
          dataSource={state.listingsFilters?.forSaleRentSold?.soldDateRangeRows}
          rowSelection={{
            type: 'radio',
            selectedRowKeys:
              state.listingsFilters?.forSaleRentSold?.soldDateRange,
          }}
          onRow={(record) => {
            return {
              onClick: () => handleSoldDateRangeClick(record.key),
            }
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
          dataSource={[
            {
              key: 'all-filters-btn-sold',
              listingFilterCategory: 'Sold',
            },
          ]}
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

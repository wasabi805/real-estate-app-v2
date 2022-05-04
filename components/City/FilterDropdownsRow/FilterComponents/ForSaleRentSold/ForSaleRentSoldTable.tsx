import React, { useContext } from 'react'
import AppContext from 'context/appContext'

import * as ForSaleRentSoldActions from 'actions/ListingsActions/FilterActions/forSaleRentSoldActions'
import { Table } from 'antd'
import 'antd/dist/antd.css'
import {
  ForSaleRentSoldContainer,
  SoldRadioWrapper,
} from 'components/City/FilterDropdownsRow/FilterComponents/ForSaleRentSold/styles'
import { ForSaleRentSoldTableFormat } from 'components/City/FilterDropdownsRow/FilterComponents/ForSaleRentSold'
import useFilterListings from '@hooks/useFilterListings'

const { setFilterByPropertyType, setSoldDateRange } = ForSaleRentSoldActions

const ForSaleRentSold = () => {
  const { columns, saleRent, soldExpandable } = ForSaleRentSoldTableFormat

  const { state, dispatch } = useContext(AppContext)

  const { currentSetFilters, filteredListings } = useFilterListings()

  const handleClickPropertyStatus = (recordKey: string) => {
    filteredListings(
      {
        key: 'forSaleRentSold',
        id: recordKey,
      },
      state
    )
  }

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
        <Table
          pagination={false}
          showHeader={false}
          columns={
            state.listings?.filters?.forSaleRentSold?.soldDateRangeColumns
          }
          dataSource={
            state.listings?.filters?.forSaleRentSold?.soldDateRangeRows
          }
          rowSelection={{
            type: 'radio',
            selectedRowKeys:
              state.listings?.filters?.forSaleRentSold?.soldDateRange,
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
      <Table
        pagination={false}
        showHeader={false}
        rowSelection={{
          type: 'radio',
          selectedRowKeys: state.listings?.filters?.forSaleRentSold?.filterBy,
        }}
        columns={newColumns}
        dataSource={newSaleRentRows}
        onRow={(record, rowIndex) => ({
          onClick: () => handleClickPropertyStatus(record.key),
        })}
      />

      <SoldRadioWrapper>
        <Table
          pagination={false}
          showHeader={false}
          rowSelection={{
            type: 'radio',
            selectedRowKeys: state.listings?.filters?.forSaleRentSold?.filterBy,
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
            expandedRowKeys: state.listings?.filters?.forSaleRentSold?.filterBy,
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

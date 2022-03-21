import React, { useContext } from 'react'
import AppContext from 'context/appContext'
import { Table,} from 'antd'
import 'antd/dist/antd.css'
import { columnNames } from './Listings/ListingTable/columnNames'

const ListingTable = () => {
  const appContext = useContext(AppContext)
  const { state } = appContext
  const { searchResults } = state
  console.log(searchResults, 'searchResults')
  const {listings} = searchResults.data

  const homeListings = listings.map( home=>{
    const {property_id, price, beds, address, baths} =home
    return{
      key: property_id,
      address: address,
      price: price,
      beds: beds,
      baths: baths,
    }
  })

  return (
    <>
      <Table columns={columnNames} dataSource={homeListings} />
    </>
  )
}

export default ListingTable

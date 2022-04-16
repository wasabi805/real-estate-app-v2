import ForSaleRentSold from './ForSaleRentSold'

export const ForSaleRentSoldTableFormat = {
  columns: [
    {
      title: 'Listing Category',
      dataIndex: 'listingFilterCategory',
    },
  ],

  saleRent: [
    {
      key: 'listing-filter-forSale',
      listingFilterCategory: 'For sale',
    },
    {
      key: 'listing-filter-forRent',
      listingFilterCategory: 'For rent',
    },
  ],
  soldExpandable: [
    {
      key: 'listing-filter-sold',
      listingFilterCategory: 'Sold',
    },
  ],
}
export { ForSaleRentSold }

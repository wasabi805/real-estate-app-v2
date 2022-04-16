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

  soldDatePeriodColumn: [
    {
      title: 'Sold Date Period',
      dataIndex: 'soldDatePeriod',
    },
  ],

  soldDatePeriodRows: [
    {
      key: 'sold-last-1-week',
      soldDatePeriod: 'Last 1 Week',
    },
    {
      key: 'sold-last-1-month',
      soldDatePeriod: 'Last 1 Month',
    },
  ],
}
export { ForSaleRentSold }

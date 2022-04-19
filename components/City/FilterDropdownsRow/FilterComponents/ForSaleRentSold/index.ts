import ForSaleRentSold from './ForSaleRentSoldTable'

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
    {
      key: 'sold-last-3-months',
      soldDatePeriod: 'Last 3 Months',
    },
    {
      key: 'sold-last-6-months',
      soldDatePeriod: 'Last 6 Months',
    },
    {
      key: 'sold-last-1-year',
      soldDatePeriod: 'Last 1 Year',
    },
    {
      key: 'sold-last-2-years',
      soldDatePeriod: 'Last 2 Years',
    },
    {
      key: 'sold-last-3-years',
      soldDatePeriod: 'Last 3 Years',
    },
    {
      key: 'sold-last-5-years',
      soldDatePeriod: 'Last 5 Years',
    },
  ],
}
export { ForSaleRentSold }

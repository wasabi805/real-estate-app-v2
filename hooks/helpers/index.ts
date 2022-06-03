import {
  joinStringWith,
  forSaleSoldRentCategory,
  homeTypeCategory,
  bathsCategory,
  nAbbreviator,
} from 'utils'

export const buildUrlFilterString = (state: any, routeTo = null) => {
  const { city, state: stateLocation } = state.searchResults

  const { forSaleRentSold, price, homeType, bedsBaths } = state.listings.filters
  const { isAscending, criteria } = state.listings.sort
  let url

  routeTo
    ? (url = routeTo)
    : (url = `/city/${joinStringWith(city, '-')}/${stateLocation}`)

  // removes any from the url string when clear button is clicked
  const bedsMin =
    bedsBaths?.currentRange[0] === 'any' ? '' : bedsBaths?.currentRange[0]
  const bathsMin =
    bathsCategory(bedsBaths.currentBaths) === 'any'
      ? ''
      : bathsCategory(bedsBaths.currentBaths)
  const highLow = isAscending === true ? 'low' : 'high'

  const queryValues = {
    sort: isAscending === null ? '' : `${criteria}-${highLow}`,
    status: forSaleSoldRentCategory(forSaleRentSold.filterBy[0]),
    hometype: homeTypeCategory(homeType.selected),
    'beds-min': bedsMin,
    'beds-max':
      bedsBaths?.currentRange.length > 1
        ? bedsBaths?.currentRange[bedsBaths?.currentRange.length - 1]
        : '',
    'baths-min': bathsMin,
    'min-price': nAbbreviator(price.minField),
    'max-price': nAbbreviator(price.maxField),
  }

  const query = Object.entries(queryValues).reduce((a, [key, value]) => {
    return value ? { ...a, [key]: value } : a
  }, {})

  const addFilter = Object.entries(query).some((val) => val)

  return {
    pathname: url + (addFilter ? '/filters' : '/').trim(),
    query: { ...query },
  }
}

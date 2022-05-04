/* Strings */
export const ifWhiteSpaces = (string: string) => {
  return string.split(' ').length > 1 ? string.split(' ').join('-') : string
}

export const homeTypeCategory = (className: string) => {
  return className.replace(/^(home-type-)/, '')
}

export const forSaleSoldRentCategory = (className: string) => {
  return className.replace(/^(all-filters-btn-)/, '')
}

export const bathsCategory = (className: string) => {
  return className.replace(/^(baths-filter-btn-)/, '')
}

/* Numbers */
export const sortByAscendOrDescend = (
  isAsc: Boolean,
  key: string,
  data: []
): [] => {
  return data.sort((a: any, b: any) => {
    return isAsc ? a[key] - b[key] : +b[key] - +a[key]
  })
}

export const sortIntergersAscending = (array: number[]) =>
  array.sort((a: number, b: number) => {
    return a - b
  })

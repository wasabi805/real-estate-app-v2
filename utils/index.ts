/* Strings */
export const ifWhiteSpaces = (string) => {
  return string.split(' ').length > 1 ? string.split(' ').join('-') : string
}

export const homeTypeCategory = (homeTypeClass: string) => {
  return homeTypeClass.replace(/^(home-type-)/, '')
}

/* Numbers */
export const sortByAscendOrDescend = (
  isAsc: Boolean,
  key: string,
  data: []
): [] => {
  console.log('what is data', data)
  return data.sort((a: any, b: any) => {
    return isAsc ? a[key] - b[key] : +b[key] - +a[key]
  })
}

export const sortIntergersAscending = (array) =>
  array.sort((a: number, b: number) => {
    return a - b
  })

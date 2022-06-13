/* Strings */
export const joinStringWith = (string: string, char: string) => {
  return string.split(' ').length > 1 ? string.split(' ').join(char) : string
}

export const replaceWhiteSpaceWith = (str: string, char: string) => {
  return str.replace(/\s+/g, char).toLowerCase()
}

export const containsSubString = (str: string, subStr: string) => {
  return str.includes(subStr)
}

export const extractHTMLTagValue = (htmlStr) => {
  return htmlStr.replace(/<[^>]+>/g, '')
}

export const isNumeric = (str: string) => {
  return /^\d+$/.test(str)
}

export const isZipCode = (str: string) => {
  return /^\d{5}(?:[-\s]\d{4})?$/.test(str)
}

export const homeTypeCategory = (className: string) => {
  return className.replace(/^(home-type-)/, '')
}

export const formatHomeType = (arr: string[]) => {
  const homeTypes = arr.reduce(
    (acc, str) => acc + homeTypeCategory(str) + '+',
    ''
  )
  return homeTypes.slice(0, -1)
}

export const forSaleSoldRentCategory = (className: string) => {
  return className.replace(/^(all-filters-btn-)/, '')
}

export const bathsCategory = (className: string) => {
  return className.replace(/^(baths-filter-btn-)/, '')
}

export const bedsValue = (className: string) => {
  return className.replace(/^(beds=)/, '')
}

export const getBedsMinAndMax =( range: any )=>{

  let minBeds ;
  let maxBeds ;
  console.log(range, 'typeof range[0]')
  if(typeof range[0] === 'string' ){
    minBeds = null
    maxBeds = null
  }

  if(typeof range[0] === 'number' && range.length === 1){
    minBeds = range[0]
  }

  if(typeof range[0] === 'number' && range.length > 1 && range[range.length-1] !== 5){
    minBeds = range[0]
    maxBeds = range[range.length-1] 
  }

  if(typeof range[0] === 'number' && range.length > 1 && range[range.length-1] === 5){
    minBeds = range[0]
    maxBeds = null
  }

  return {minBeds, maxBeds}

}

export const extractZipCodeFromString = (str: string) => {
  const startIndex = str.search(/\d{5}/)
  if (startIndex === -1) {
    return false
  }
  return str.slice(startIndex, startIndex + 5)
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

export const nAbbreviator = (num: number) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G'
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  }
  return num
}

export const logAutoCompleteResp = ({ response }) => {
  console.log(
    'AutoComplete results or Suggested places from google api: ',
    response
  )
}

export const sortByAscendOrDescend = (isAsc: Boolean, key: string, data: any) =>
  data.sort((a: any, b: any) => {
    return isAsc ? a[key] - b[key] : +b[key] - +a[key]
  })
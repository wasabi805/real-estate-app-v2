import axios from 'axios'

export const sortByAscendOrDescend = (
  isAsc: Boolean,
  key: string,
  data: []
): [] => {
  return data.sort((a: any, b: any) => {
    return isAsc ? a[key] - b[key] : +b[key] - +a[key]
  })
}

export const filterListings = () => {
  return axios.get('https://jsonplaceholder.typicode.com/todos/1')
}

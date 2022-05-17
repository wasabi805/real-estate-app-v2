import { joinStringWith } from 'utils'

export const cityPageUrl = ({ cityName, stateName }) => {
  const url = `/city/${joinStringWith(
    cityName,
    '-'
  ).toLowerCase()}/${joinStringWith(stateName, '-').toLowerCase()}`
  return url
}

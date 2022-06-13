/** Array */
export const isArr = (array) => Array.isArray(array)

/** Objects */

const updateObj = (key: string) => (val: any) => (obj: any) => {
  if (typeof obj[key] === 'undefined') {
    return { ...obj, [key]: val }
  }
  return Object.keys(obj).reduce(
    (a, c) => ({ ...a, [c]: key === c ? val : obj[c] }),
    {}
  )
}

export const updateNestedObj =
  ([key, ...keys]: string[]) =>
  (val: any) =>
  (obj: any) => {
    if (!key) return val
    if (keys.length > 0) {
      const nextObj = obj[key] !== undefined ? obj[key] : {}
      val = updateNestedObj(keys)(val)(nextObj)
    }
    return updateObj(key)(val)(obj)
  }

export const arrayIncludesString = (array, string) => array.includes(string)

/** Filter Strings used in url for listings */
export const addRemoveCurrentFilters = (
  keyString: string, // ex.) homeType
  updateValue: string[], // ex.) ['homeType=condo']
  filters: string[] // ex.) state.listings.filters.currentSetFilters
) => {
  let updateFilters = [...filters]

  const matches = updateFilters.filter((str) => str.includes(keyString))

  // if the filter string exists, add to updateFilters
  if (matches.length === 0) {
    updateFilters = [...filters, ...updateValue]
  }

  // if the filter string does exists, replace it in updateFilters
  if (matches.length > 0) {
    const index = updateFilters.indexOf(matches[0])
    updateFilters[index] = updateValue[0]
  }

  return updateFilters
}



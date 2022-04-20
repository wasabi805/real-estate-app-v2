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
  ([key, ...keys]) =>
  (val: any) =>
  (obj: any) => {
    if (!key) return val
    if (keys.length > 0) {
      const nextObj = obj[key] !== undefined ? obj[key] : {}
      val = updateNestedObj(keys)(val)(nextObj)
    }
    return updateObj(key)(val)(obj)
  }

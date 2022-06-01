export const setIsLoading = ({ state, action }) => {
  return {
    ...state,
    isLoading: action.payload.isLoading,
  }
}

export const setPreviousState = ({ state, action }) => {
  const prevState = action.payload.state
  console.log('what is the action in reducer slice', action)

  return prevState
}

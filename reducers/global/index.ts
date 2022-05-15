export const setIsLoading = ({ state, action }) => {
  return {
    ...state,
    isLoading: action.payload.isLoading,
  }
}

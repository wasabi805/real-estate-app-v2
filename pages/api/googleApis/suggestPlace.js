import handleAutoCompleteSubmitted from './handleAutoCompleteSubmitted'
import handleStandardFormSubmit from './handleStandardFormSubmit'

const suggestPlace = async (request, response) => {
  try {
    const { isAutoComplete } = request.query
    

    isAutoComplete === 'true'
      ? handleAutoCompleteSubmitted(request, response)
      : handleStandardFormSubmit(request, response)
  } catch (err) {
    console.log('error at pages/api/googleApis, check request')
  }
}
export default suggestPlace

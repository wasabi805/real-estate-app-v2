const suggestPlace = async (request, response) => {
  console.log('what is the request', request.query)
  try {
    response.send('connected to suggestPlace api')
  } catch (err) {
    console.log('error at pages/api/googleApis, check request')
  }
}
export default suggestPlace

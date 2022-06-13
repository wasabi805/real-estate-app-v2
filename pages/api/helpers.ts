export const getStatus = (status: string) => {
  switch (status) {
    case 'for-sale':
      return 'https://realtor.p.rapidapi.com/properties/list-for-sale'

    case 'for-rent':
      return 'https://realtor.p.rapidapi.com/properties/list-for-rent'

    case 'sold':
      return 'https://realtor.p.rapidapi.com/properties/list-sold'

    default:
      return 'https://realtor.p.rapidapi.com/properties/list-for-sale'
  }
}

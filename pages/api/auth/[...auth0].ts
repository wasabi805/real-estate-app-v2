import { handleAuth } from '@auth0/nextjs-auth0'
export default handleAuth()

/**
  after getting this file setup and going to api/auth/login,
  if you see error:

  error=invalid_request
  error_description=no connections enabled for the client

  see the fix there : https://smashnotes.com/updates/no-connections-enabled-for-the-client
 */

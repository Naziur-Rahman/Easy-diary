import React from 'react'
import { useRouteError } from 'react-router-dom'
const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <div id="error-page">
      <div className='py-40 , text-center'>
      <h1 className='py-4 font-bold'>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      </div>
  </div>
  )
}

export default ErrorPage

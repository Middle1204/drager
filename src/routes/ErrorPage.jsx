import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div style={{ padding: '2rem' }}>
      <p>Something went wrong </p>
      <p><i>{error.statusText || error.message}</i></p>
    </div>
  );
};

export default ErrorPage;

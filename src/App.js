import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from './routes/RootLayout.jsx';
import ErrorPage from './routes/ErrorPage.jsx';

import Main from './routes/main/main';
import Play from './routes/play/play';
import Play2 from './routes/play2/play2'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Main /> }, 
      { path: 'play', element: <Play /> },
      { path: 'play2', element: <Play2 />}
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

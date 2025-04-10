import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from './routes/RootLayout.jsx';
import ErrorPage from './routes/ErrorPage.jsx';

import Main from './routes/main/main.jsx';
import Play from './routes/play/play';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Main /> }, 
      { path: 'play', element: <Play /> } 
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

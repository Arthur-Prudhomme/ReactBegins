import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { BasketProvider } from './Contexts/BasketContext'

import Home from './Pages/Home';
import Products from './Pages/Products';
import Basket from './Pages/Basket';
import { store } from './store';

const router = createBrowserRouter([{
  path: "/",
  element: <Home />
},
{
  path: "/home",
  element: <Home />
},
{
  path: "/products",
  element: <Products />
},
{
  path: "/basket",
  element: <Basket />
}
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BasketProvider>
      <Provider store={store} >
        <RouterProvider router={router} />
      </Provider>
    </BasketProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import { SearchStoreProvider } from './containers/pages/customers/search/ContextStore'

ReactDOM.render(
  <BrowserRouter>
    <SearchStoreProvider>
      <App />
    </SearchStoreProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
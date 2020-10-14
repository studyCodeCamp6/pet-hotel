import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import Navbar from './containers/component/Navbar/Navbar';
import SearchResult from './containers/pages/search/SearchResult';
import CreateReview from './containers/pages/customer_review/CreateReview';
import Task_Customers from './containers/pages/task/Task_Customers';
import Task_Providers from './containers/pages/task/Task_Providers';
import Search from 'antd/lib/input/Search';



ReactDOM.render(
  <BrowserRouter>
    {/* <App /> */}
    <Navbar />
    {/* <CreateReview /> */}
    <SearchResult />

    {/* <Task_Customers /> */}
    {/* <Task_Providers /> */}
  </BrowserRouter>,
  document.getElementById('root')
);


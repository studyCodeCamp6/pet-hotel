import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import CreateReview from './containers/pages/customer_review/CreateReview';
import Task_Customers from './containers/pages/task/Task_Customers';
import Task_Providers from './containers/pages/task/Task_Providers';

ReactDOM.render(
  <BrowserRouter>
    {/* <App /> */}
    <CreateReview />
    {/* <Task_Customers /> */}
    {/* <Task_Providers /> */}
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

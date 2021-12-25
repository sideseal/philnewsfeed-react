import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import App from './App';
import Snow from './Snow';


axios.defaults.baseURL = "http://localhost:3000/";
// axios.defaults.withCredentials = true;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
ReactDOM.render(
  <React.StrictMode>
    <Snow />
  </React.StrictMode>,
  document.getElementById('snow'),
);
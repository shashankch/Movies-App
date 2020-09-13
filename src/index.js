import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import './index.css';
import App from './components/App';
import movies from './reducers';


const store=createStore(movies);
console.log('store',store);
// console.log('before store state',store.getState());

// store.dispatch({
//   type:'ADD_MOVIES',
//   movies:[{name:'batman'}]
// })
// console.log('after store state',store.getState());
ReactDOM.render(
  <React.StrictMode>
    <App store={store}/>
  </React.StrictMode>,
  document.getElementById('root')
);

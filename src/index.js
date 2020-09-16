import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import "./index.css";
import App from "./components/App";
import rootReducer from "./reducers";

// function loggger(obj,next,action)
// logger(obj)(next)(action)  internally how call is being done..

// const logger=function({dispatch,getState}){

//   return function(next){
//     return function(action){
//       // middleware code
//       console.log('ACTION_TYPE=',action.type);
//       next(action);
//     }
//   }

// }

// another way to write middleware ...cleaner way
const logger = ({ dispatch, getState }) => (next) => (action) => {
  // logger code
  console.log("ACTION_TYPE=", action.type);
  next(action);
};

const thunk=({dispatch,getState})=>(next)=>(action)=>{
  // logger code
  if(typeof action==='function'){
    action(dispatch);
  }
  else{
  next(action);
  }
}



const store = createStore(rootReducer, applyMiddleware(logger,thunk));
console.log("store", store);
// console.log('before store state',store.getState());

// store.dispatch({
//   type:'ADD_MOVIES',
//   movies:[{name:'batman'}]
// })
// console.log('after store state',store.getState());
ReactDOM.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>,
  document.getElementById("root")
);

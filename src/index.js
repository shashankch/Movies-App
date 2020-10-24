import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import './index.css';
import App from './components/App';
import rootReducer from './reducers';

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
  console.log('ACTION_TYPE=', action.type);
  next(action);
};

const thunk = ({ dispatch, getState }) => (next) => (action) => {
  // logger code
  if (typeof action === 'function') {
    action(dispatch);
  } else {
    next(action);
  }
};

const store = createStore(rootReducer, applyMiddleware(logger, thunk));
console.log('store', store);

export const StoreContext = createContext();

console.log('StoreContext', StoreContext);

// console.log('before store state',store.getState());

// store.dispatch({
//   type:'ADD_MOVIES',
//   movies:[{name:'batman'}]
// })
// console.log('after store state',store.getState());

class Provider extends React.Component {
  render() {
    const { store } = this.props;

    return (
      <StoreContext.Provider value={store}>
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}
// const connectedComponent = connect(callback)(App);
export function connect(callback) {
  return function (Component) {
    class ConnectedComponent extends React.Component {
      constructor(props) {
        super(props);
        this.unsubscribe = this.props.store.subscribe(() => {
          this.forceUpdate();
        });
      }

      componentWillUnmount() {
        this.unsubscribe();
      }
      render() {
        const { store } = this.props;
        const state = store.getState();
        const dataToBeSentAsProps = callback(state);

        return <Component dispatch={store.dispatch} {...dataToBeSentAsProps} />;
      }
    }

    class ConnectedComponentWrapper extends React.Component {
      render() {
        return (
          <StoreContext.Consumer>
            {(store) => {
              return <ConnectedComponent store={store} />;
            }}
          </StoreContext.Consumer>
        );
      }
    }
    return ConnectedComponentWrapper;
  };
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

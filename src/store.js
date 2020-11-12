import {createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';
const middleware=[thunk];
const initialState = {};

const store = createStore(
    rootReducer,
    initialState,

    compose(
        applyMiddleware(...middleware)
    )
);

export default store;
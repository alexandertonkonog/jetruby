import {createStore, combineReducers, applyMiddleware} from 'redux';
import {mainReducer} from './mainReducer';
import thunk from 'redux-thunk';


let reducers = combineReducers({
	main: mainReducer
});

let store = createStore(reducers, applyMiddleware(thunk));


window.store = store;
export default store;
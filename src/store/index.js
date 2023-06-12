import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import tasksReducer from './reducers';

const store = createStore(tasksReducer, applyMiddleware(thunk));

export default store;

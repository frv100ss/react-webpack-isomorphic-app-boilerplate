import {createStore} from 'redux';
import {combineReducers} from 'redux';
import {CreateArticle} from './articleActionController';


const store = createStore(
    combineReducers({
        CreateArticle,
    })
);

export default store;
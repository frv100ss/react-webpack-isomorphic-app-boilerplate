import update from 'react-addons-update';

import initialState from './initialState';
export function CreateArticle(state = initialState, action) {
    switch (action.type) {
        case "ARTICLE_TITLE":
            return update(state, {
                title: {$set: action.data}
            });
            break;

        case "ARTICLE_CORPUS":
            return update(state, {
                corpus: {$set: action.data}
            });
            break;

        case "ARTICLE_DATE":
            return update(state, {
                date: {$set: action.data}
            });
            break;

        case "ARTICLE_HOUR":
            return update(state, {
                hour: {$set: action.data}
            });
            break;

        case "ARTICLE_ADD_TAG":
            return update(state, {
                tags: {$set: [action.data]}
            });
            break;

        case "ARTICLE_ADD_MAIN_IMG":
            return update(state, {
                mainImg: {$set: action.data}
            });
            break;

        case "ARTICLE_REMOVE_MAIN_IMG":
            return update(state, {
                mainImg: {$set: action.data}
            });
            break;


        default:
            return state
    }
}
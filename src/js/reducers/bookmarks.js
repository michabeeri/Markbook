
define(['lodash', 'constants'], function (_, Constants) {

    'use strict';

    return function bookmarks(state, action) {
        switch (action.type) {
            case Constants.ADD_BOOKMARK:
                return (state ? state.slice() : []).concat({
                    id: action.id,
                    title: action.title,
                    date: action.date
                });
            case Constants.REMOVE_BOOKMARK:
                return _.reject(state, function (bm) {
                    return bm.id && bm.id === action.id;
                });
            default:
                return state;
        }
    };
});

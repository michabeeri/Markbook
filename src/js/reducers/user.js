define(['redux', 'reducers/bookmarks', 'reducers/userInfo', 'reducers/filterReducer'], function (Redux, bookmarksReducer, userInfoReducer, filterReducer) {
    'use strict';

    return Redux.combineReducers({
        bookmarks: bookmarksReducer,
        userInfo: userInfoReducer,
        filter: filterReducer
    });
});

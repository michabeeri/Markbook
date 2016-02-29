define(['redux', 'reducers/bookmarks', 'reducers/userInfo', 'reducers/filter'], function (Redux, bookmarksReducer, userInfoReducer, filterReducer) {
    'use strict';

    return Redux.combineReducers({
        bookmarks: bookmarksReducer,
        userInfo: userInfoReducer,
        filter: filterReducer
    });
});

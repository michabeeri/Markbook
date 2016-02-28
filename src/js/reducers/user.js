define(['redux', 'reducers/bookmarks', 'reducers/userInfo'], function (Redux, bookmarksReducer, userInfoReducer) {
    'use strict';

    return Redux.combineReducers({
        bookmarks: bookmarksReducer,
        userInfo: userInfoReducer
    });
});

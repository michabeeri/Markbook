define(['redux', 'reducers/bookmarks', 'reducers/userInfo', 'reducers/filter', 'reducers/currentBookmarkPath', 'ReduxSimpleRouter', 'reducers/modalReducer'],
    function (Redux, bookmarksReducer, userInfoReducer, filterReducer, currentBookmarkPathReducer, ReduxSimpleRouter, modalReducer) {
    'use strict';

    return Redux.combineReducers({
        bookmarks: bookmarksReducer,
        userInfo: userInfoReducer,
        filter: filterReducer,
        currentBookmarkPath: currentBookmarkPathReducer,
        routing: ReduxSimpleRouter.routeReducer,
        modals: modalReducer
    });
});


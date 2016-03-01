define(['redux', 'reducers/bookmarks', 'reducers/userInfo', 'reducers/filter', 'reducers/currentBookmarkPath', 'ReduxSimpleRouter'],
    function (Redux, bookmarksReducer, userInfoReducer, filterReducer, currentBookmarkPathReducer, ReduxSimpleRouter) {
    'use strict';

    return Redux.combineReducers({
        bookmarks: bookmarksReducer,
        userInfo: userInfoReducer,
        filter: filterReducer,
        currentBookmarkPath: currentBookmarkPathReducer,
        routing: ReduxSimpleRouter.routeReducer
    });
});

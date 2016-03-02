define(['redux', 'reducers/bookmarks', 'reducers/userInfo', 'reducers/filter', 'reducers/currentBookmarkPath'],
    function (Redux, bookmarksReducer, userInfoReducer, filterReducer, currentBookmarkPathReducer) {
    'use strict';

    return Redux.combineReducers({
        bookmarks: bookmarksReducer,
        userInfo: userInfoReducer,
        filter: filterReducer,
        currentBookmarkPath: currentBookmarkPathReducer,
        sort: sortReducer,
        routing: ReduxSimpleRouter.routeReducer
    });
});

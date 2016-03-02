
define(['redux', 'reducers/bookmarks', 'reducers/userInfo', 'reducers/filter', 'reducers/currentBookmarkPath', 'reducers/sort', 'ReduxSimpleRouter'],
    function (Redux, bookmarksReducer, userInfoReducer, filterReducer, currentBookmarkPathReducer, sortReducer, ReduxSimpleRouter) {
        'use strict';
        return Redux.combineReducers({
            bookmarks: bookmarksReducer,
            userInfo: userInfoReducer,
            filter: filterReducer,
            currentBookmarkPath: currentBookmarkPathReducer,
            sort: sortReducer,
            routing: ReduxSimpleRouter.routeReducer,
            modals: modalReducer
        });
    });

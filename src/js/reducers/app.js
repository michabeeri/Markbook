
define(['redux', 'reducers/bookmarks', 'reducers/userInfo', 'reducers/filter', 'reducers/currentBookmarkPath', 'reducers/sort', 'ReduxSimpleRouter', 'reducers/modalReducer', 'reducers/layout', 'reducers/flags'],
    function (Redux, bookmarksReducer, userInfoReducer, filterReducer, currentBookmarkPathReducer, sortReducer, ReduxSimpleRouter, modalReducer, layout, flags) {
        'use strict';
        return Redux.combineReducers({
            bookmarks: bookmarksReducer,
            userInfo: userInfoReducer,
            filter: filterReducer,
            currentBookmarkPath: currentBookmarkPathReducer,
            sort: sortReducer,
            routing: ReduxSimpleRouter.routeReducer,
            modals: modalReducer,
            layout: layout,
            flags: flags
        });
    });

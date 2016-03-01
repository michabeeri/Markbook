define([],
    function () {
        'use strict';

        var eModalType = {
            NONE: 'None',
            MODAL_ADD_BOOKMARK: 'Add Bookmark modal',
            MODAL_EDIT_GROUP: 'Modal Edit Group'
        };

        var bookmarkType = {
            LEAF: 'LEAF',
            GROUP: 'GROUP'
        };

        var layoutType = {
            GRID: 'GRID',
            LIST: 'LIST'
        };

        return {
            APP_NAME: 'Markbook',

            eModalType: eModalType,
            bookmarkType: bookmarkType,
            layoutType: layoutType,

            // Bookmark action types
            ADD_BOOKMARK: 'ADD_BOOKMARK',
            OPEN_BOOKMARK_GROUP: 'OPEN_BOOKMARK_GROUP',
            EDIT_BOOKMARK: 'EDIT_BOOKMARK',
            TOGGLE_BOOKMARK_SELECTION: 'TOGGLE_BOOKMARK_SELECTION',
            REMOVE_BOOKMARK: 'REMOVE_BOOKMARK',
            NAVIGATE_TO_PREVIOUS_GROUP: 'NAVIGATE_TO_PREVIOUS_GROUP',

            // user info action types
            LOGOUT: 'LOGOUT',

            // filter
            SET_FILTER: 'SET_FILTER',

            GRID_MIN_WIDTH: 960

        };
    });

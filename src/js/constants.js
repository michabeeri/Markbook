define([],
    function () {
        'use strict';

        var eModalType = {
            NONE: 'None',
            MODAL_ADD_BOOKMARK: 'Add Bookmark modal',
            MODAL_EDIT_GROUP: 'Modal Edit Group',
            LAST_BOOKMARK_IN_GROUP_ALERT: 'Last Item In Group Alert',
            GROUP_DELETE_NOTIFICATION: 'Group Delete Notification'
        };


        var bookmarkType = {
            LEAF: 'LEAF',
            GROUP: 'GROUP'
        };

        var layoutType = {
            GRID: 'GRID',
            LIST: 'LIST'
        };

        var sortTypes = {
            DEFAULT: {
                value: 'DEFAULT',
                description: 'None'
            },
            DATE_ASC: {
                value: 'DATE_ASC',
                description: 'Date, old to new'
            },
            DATE_DESC: {
                value: 'DATE_DESC',
                description: 'Date, new to old'
            },
            TITLE_ASC: {
                value: 'TITLE_ASC',
                description: 'Title Ascending'
            },
            TITLE_DESC: {
                value: 'TITLE_DESC',
                description: 'Title Descending'
            },
            TYPE: {
                value: 'TYPE',
                description: 'Type'
            }
        };

        return {
            APP_NAME: 'Markbook',

            bookmarkType: bookmarkType,
            layoutType: layoutType,
            sortTypes: sortTypes,
            eModalType: eModalType,

            //Application root database:
            APP_ROOT_DATA: 'https://markbook.firebaseio.com/',

            // Bookmark action types
            ADD_BOOKMARK: 'ADD_BOOKMARK',
            OPEN_BOOKMARK_GROUP: 'OPEN_BOOKMARK_GROUP',
            EDIT_BOOKMARK: 'EDIT_BOOKMARK',
            TOGGLE_BOOKMARK_SELECTION: 'TOGGLE_BOOKMARK_SELECTION',
            REMOVE_BOOKMARK: 'REMOVE_BOOKMARK',
            REMOVE_REPARENT_CHILDREN: 'REMOVE_REPARENT_CHILDREN',
            REMOVE_LAST_BOOKMARK_IN_GROUP: 'REMOVE_LAST_BOOKMARK_IN_GROUP',
            NAVIGATE_TO_PREVIOUS_GROUP: 'NAVIGATE_TO_PREVIOUS_GROUP',
            DRAG_REORDER: 'DRAG_REORDER',
            OPEN_MODAL: 'OPEN_MODAL',
            CLOSE_MODAL: 'CLOSE_MODAL',
            ROOT_GROUP_ID: 'rootGroup',

            // user info action types
            LOGOUT: 'LOGOUT',
            LOGIN: 'LOGIN',

            // tool bar
            SET_FILTER: 'SET_FILTER',
            SET_SORT_TYPE: 'SET_SORT_TYPE',
            DEFAULT_SORT_TYPE: 'DEFAULT',

            GRID_MIN_WIDTH: 960
        };
    });

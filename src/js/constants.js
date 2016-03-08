define([],
    function () {
        'use strict';

        var eModalType = {
            NONE: 'None',
            MODAL_BOOKMARK_DATA: 'Modal Bookmark Data',
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
            CUSTOM: {
                value: 'CUSTOM',
                description: 'custom'
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
            APP_LOGO_SRC: 'img/logo.png',

            bookmarkType: bookmarkType,
            layoutType: layoutType,
            sortTypes: sortTypes,
            eModalType: eModalType,

            //Application root database:
            APP_ROOT_DATA: 'https://markbook.firebaseio.com/',

            //local Storage
            LOCAL_STORAGE_KEY: 'markbook',
            LOCAL_STORAGE_SORT: 'sort',
            LOCAL_STORAGE_LAYOUT: 'layout',

            // Bookmark action types
            ADD_BOOKMARK: 'ADD_BOOKMARK',
            ADD_BOOKMARK_AND_GROUP: 'ADD_BOOKMARK_AND_GROUP',
            OPEN_BOOKMARK_GROUP: 'OPEN_BOOKMARK_GROUP',
            EDIT_BOOKMARK: 'EDIT_BOOKMARK',
            EDIT_BOOKMARK_AND_CREATE_GROUP: 'EDIT_BOOKMARK_AND_CREATE_GROUP',
            TOGGLE_BOOKMARK_SELECTION: 'TOGGLE_BOOKMARK_SELECTION',
            REMOVE_BOOKMARK: 'REMOVE_BOOKMARK',
            REMOVE_REPARENT_CHILDREN: 'REMOVE_REPARENT_CHILDREN',
            REMOVE_LAST_BOOKMARK_IN_GROUP: 'REMOVE_LAST_BOOKMARK_IN_GROUP',
            NAVIGATE_TO_PREVIOUS_GROUP: 'NAVIGATE_TO_PREVIOUS_GROUP',
            DRAG_REORDER_INIT: 'DRAG_REORDER_INIT',
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
            DEFAULT_SORT_TYPE: 'DATE_ASC',
            CUSTOM_SORT_TYPE: 'CUSTOM',
            SELECT_DESELECT_ALL: 'SELECT_DESELECT_ALL',

            // Database
            LOAD_DATA: 'LOAD_DATA',
            STORE_DATA: 'STORE_DATA',
            UPDATE_DATABASE: 'UPDATE_DATABASE',

            // Layout
            SET_LAYOUT: 'SET_LAYOUT',
            GRID_MIN_WIDTH: 960,

            //Flags
            ADD_FLAG: 'ADD_FLAG',
            REMOVE_FLAG: 'REMOVE_FLAG',
            FIRST_VISIT_FLAG: 'FIRST_VISIT_FLAG',
            BOOKMARKS_LOADED: 'BOOKMARKS_LOADED',

            // Key codes
            DOWN_ARROW: 40,
            UP_ARROW: 38
        };
    });

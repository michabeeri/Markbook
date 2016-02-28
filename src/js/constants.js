define([],
    function () {
        'use strict';

        var eModalType = {
            NONE: 'None',
            MODAL_ADD_BOOKMARK: 'Add Bookmark modal',
            MODAL_EDIT_GROUP: 'Modal Edit Group'
        };

        return {
            APP_NAME: 'Markbook',

            eModalType: eModalType,

            // Action types
            ADD_BOOKMARK: 'ADD_BOOKMARK',
            REMOVE_BOOKMARK: 'REMOVE_BOOKMARK'

        };
    });

define(['components/modals/AddBookmarkModal', 'components/modals/LastItemAlert'],
    function (AddBookmarkModal, LastItemAlert) {
        'use strict';

        var eModalType = {
            NONE: 'None',
            MODAL_ADD_BOOKMARK: 'Add Bookmark modal',
            MODAL_EDIT_GROUP: 'Modal Edit Group',
            LAST_BOOKMARK_IN_GROUP_ALERT: 'Last Item In Group Alert'
        };

        var Modals = [
            {
                key: eModalType.MODAL_ADD_BOOKMARK,
                class: AddBookmarkModal,
                props: ['closeModal', 'dispatch', 'state']
            },
            {
                key: eModalType.LAST_BOOKMARK_IN_GROUP_ALERT,
                class: LastItemAlert,
                props: ['closeModal', 'dispatch']
            }
        ];

        return {
            eModalType: eModalType,
            modals: Modals
        };
    });

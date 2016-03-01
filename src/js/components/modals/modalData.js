define(['components/modals/AddBookmarkModal'],
    function (AddBookmarkModal) {
        'use strict';

        var eModalType = {
            NONE: 'None',
            MODAL_ADD_BOOKMARK: 'Add Bookmark modal',
            MODAL_EDIT_GROUP: 'Modal Edit Group'
        };

        var Modals = [
            {
                key: eModalType.MODAL_ADD_BOOKMARK,
                class: AddBookmarkModal,
                name: 'Add Bookmark Modal',
                props: ['closeModal', 'dispatch']
            }
        ];

        return {
            eModalType: eModalType,
            modals: Modals
        };
    });

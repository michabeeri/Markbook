define(['constants', 'components/modals/AddBookmarkModal', 'components/modals/LastItemAlert', 'components/modals/ModalGroupDelete'],
    function (constants, AddBookmarkModal, LastItemAlert, ModalGroupDelete) {
        'use strict';

        return [
            {
                key: constants.eModalType.MODAL_ADD_BOOKMARK,
                class: AddBookmarkModal
            },
            {
                key: constants.eModalType.LAST_BOOKMARK_IN_GROUP_ALERT,
                class: LastItemAlert
            },
            {
                key: constants.eModalType.GROUP_DELETE_NOTIFICATION,
                class: ModalGroupDelete
            }
        ];
    });

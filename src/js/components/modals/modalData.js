define(['constants', 'components/modals/BookmarkData', 'components/modals/LastItemAlert', 'components/modals/ModalGroupDelete'],
    function (constants, BookmarkData, LastItemAlert, ModalGroupDelete) {
        'use strict';

        return [
            {
                key: constants.eModalType.MODAL_ADD_BOOKMARK,
                class: BookmarkData
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

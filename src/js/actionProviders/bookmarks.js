define(['uuid', 'constants'], function (uuid, Constants) {
    'use strict';

    return {
        addBookmark: function (title, date) {
            return {
                type: Constants.ADD_BOOKMARK,
                id: uuid.v4(),
                title: title,
                date: date
            };
        },
        removeBookmark: function (id) {
            return {
                type: Constants.REMOVE_BOOKMARK,
                id: id
            };
        }
    };
});

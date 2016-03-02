define(['uuid', 'constants'], function (uuid, Constants) {
    'use strict';

    return {
        addBookmark: function (parentGroupId, title, url, tags) {
            return {
                type: Constants.ADD_BOOKMARK,
                id: uuid.v4(),
                parentGroupId: parentGroupId,
                title: title,
                url: url,
                tags: tags,
                date: new Date()
            };
        },
        editBookmark: function (id) {
            return {
                type: Constants.EDIT_BOOKMARK,
                id: id
            };
        },
        toggleBookmarkSelection: function (id, isMultiSelect) {
            return {
                type: Constants.TOGGLE_BOOKMARK_SELECTION,
                id: id,
                isMultiSelect: isMultiSelect
            };
        },
        removeBookmark: function (id) {
            return {
                type: Constants.REMOVE_BOOKMARK,
                id: id
            };
        },
        removeLastBookmarkInGroup: function (id) {
            return {
                type: Constants.REMOVE_LAST_BOOKMARK_IN_GROUP,
                id: id
            };
        },
        logout: function () {
            return {
                type: Constants.LOGOUT
            };
        },
        setFilter: function (tag, title) {
            return {
                type: Constants.SET_FILTER,
                tag: tag,
                title: title
            };
        },
        navigateToPreviousGroup: function (id) {
            return {
                type: Constants.NAVIGATE_TO_PREVIOUS_GROUP,
                id: id
            };
        },
        dragReorder: function (draggedId, draggedOverId, currentGroup) {
            return {
                type: Constants.DRAG_REORDER,
                draggedId: draggedId,
                draggedOverId: draggedOverId,
                currentGroup: currentGroup
            };
        },
        openBookmarkGroup: function (id) {
            return {
                type: Constants.OPEN_BOOKMARK_GROUP,
                id: id
            };
        }
    };
});

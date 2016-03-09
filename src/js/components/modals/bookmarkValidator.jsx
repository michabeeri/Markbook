define([''], function () {

    'use strict';

    var BookmarkValidator = {

        RESULT_VALUES: {
            groupName: 'Please select group for bookmark',
            emptyBookmarkName: 'Name field can\'t be empty',
            emptyBookmarkURL: 'URL field can\'t be empty'
        },

        isGroupValid: function (groupName) {
            return (groupName !== '');
        },
        isBookmarkNameValid: function (bookmarkName) {
            return (bookmarkName !== '');
        },
        isBookmarkURLValid: function (bookmarkUrl) {
            return (bookmarkUrl !== '');
        },

        getErrorMessageOnFail: function (bookmarkName, bookmarkUrl, groupName) {

            if (!this.isBookmarkNameValid(bookmarkName)) {
                return this.RESULT_VALUES.emptyBookmarkName;
            }
            if (!this.isGroupValid(groupName)) {
                return this.RESULT_VALUES.groupName;
            }
            if (!this.isBookmarkURLValid(bookmarkUrl)) {
                return this.RESULT_VALUES.emptyBookmarkURL;
            }
            return '';
        },

        isValid: function (bookmarkName, bookmarkUrl, groupName) {
            return ( this.isGroupValid(groupName) && (this.isBookmarkNameValid(bookmarkName)) && (this.isBookmarkURLValid(bookmarkUrl)));
        }

    };

    return BookmarkValidator;

});

define(['reactRedux', 'components/bookmarkList/bookmarkList'],
    function (ReactRedux, BookmarkList) {

        'use strict';

        return ReactRedux.connect(
            function (state) {
                return {
                    bookmarks: state.bookmarks
                };
            },
            null
        )(BookmarkList);
    });

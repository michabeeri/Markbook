define(['react', 'components/bookmarkList/bookmarkList-rdx'], function (React, BookmarkList) {
    'use strict';
    return React.createClass({
        displayName: 'MainView',
        render: function () {
            return (
                <BookmarkList/>
            );
        }
    });
});

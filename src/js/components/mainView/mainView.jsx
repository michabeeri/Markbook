define(['react', 'components/bookmarkList/bookmarkList'], function (React, BookmarkList) {
    'use strict';
    return React.createClass({
        displayName: 'MainView',
        render: function () {
            return (
                <BookmarkList {...this.props}/>
            );
        }
    });
});

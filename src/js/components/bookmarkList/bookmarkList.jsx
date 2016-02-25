define(['react', 'lodash', 'components/bookmarkList/bookmarkGroup', 'components/bookmarkList/bookmark'], function (React, _, BookmarkGroup, Bookmark) {
    'use strict';
    return React.createClass({
        displayName: 'BookmarkList',
        render: function () {
            return (
                <div>
                    {_.map(this.props.items, function (itm) {
                        if (itm.children) {
                            return <BookmarkGroup itemData={itm}/>;
                        }
                        return <Bookmark itemData={itm}/>;
                    })}
                </div>
            );
        }
    });
});

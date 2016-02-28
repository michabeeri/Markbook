
define(['lodash', 'react', 'components/bookmarkList/bookmarkGroup', 'components/bookmarkList/bookmark'],
    function (_, React, BookmarkGroup, Bookmark) {

        'use strict';

        return React.createClass({
            displayName: 'BookmarkList',
            render: function () {
                return (
                    <div>
                        {_.map(this.props.state.bookmarks, function (bm) {
                            if (bm.children) {
                                return <BookmarkGroup key={bm.id} bookmarkData={bm}/>;
                            }
                            return <Bookmark key={bm.id} bookmarkData={bm}/>;
                        })}
                    </div>
                );
            }
        });
    });

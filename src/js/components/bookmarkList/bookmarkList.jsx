
define(['lodash', 'react', 'components/bookmarkList/bookmarkGroup', 'components/bookmarkList/bookmark', 'actionProviders/bookmarks'],
    function (_, React, BookmarkGroup, Bookmark, BookmarkActionProvider) {

        'use strict';

        return React.createClass({
            displayName: 'BookmarkList',
            onView: function () {
                window.open('http://www.google.com');
            },
            dispatchActionGenerator: function (action) {
                return function () {this.props.dispatch(action); }.bind(this);
            },
            createSingle: function (bm) {
                return (<Bookmark
                    key={bm.id}
                    bookmarkData={bm}
                    onView={this.onView}
                    onEdit={this.dispatchActionGenerator(BookmarkActionProvider.editBookmark(bm.id))}
                    onDelete={this.dispatchActionGenerator(BookmarkActionProvider.removeBookmark(bm.id))}
                    onClick={this.dispatchActionGenerator(BookmarkActionProvider.toggleBookmarkSelection(bm.id, true))}
                    onDoubleClick={this.onView}/>);
            },
            createGroup: function (bm) {
                return (<BookmarkGroup
                    key={bm.id}
                    bookmarkData={bm}
                    onOpen={this.dispatchActionGenerator(BookmarkActionProvider.openBookmarkGroup(bm.id))}
                    onEdit={this.dispatchActionGenerator(BookmarkActionProvider.editBookmark(bm.id))}
                    onDelete={this.dispatchActionGenerator(BookmarkActionProvider.removeBookmark(bm.id))}
                    onClick={this.dispatchActionGenerator(BookmarkActionProvider.toggleBookmarkSelection(bm.id, true))}
                    onDoubleClick={this.dispatchActionGenerator(BookmarkActionProvider.openBookmarkGroup(bm.id))}/>);
            },
            render: function () {
                return (
                    <div className='bookmark-list-container grid'>
                        {_.map(this.props.state.bookmarks, function (bm) {
                            if (bm.children) {
                                return this.createGroup(bm);
                            }
                            return this.createSingle(bm);
                        }.bind(this))}
                    </div>
                );
            }
        });
    });

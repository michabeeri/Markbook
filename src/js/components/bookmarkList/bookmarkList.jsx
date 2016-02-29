
define(['lodash', 'react', 'components/bookmarkList/bookmarkGroup', 'components/bookmarkList/bookmark', 'actionProviders/actions'],
    function (_, React, BookmarkGroup, Bookmark, ActionProvider) {

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
                    onEdit={this.dispatchActionGenerator(ActionProvider.editBookmark(bm.id))}
                    onDelete={this.dispatchActionGenerator(ActionProvider.removeBookmark(bm.id))}
                    onClick={this.dispatchActionGenerator(ActionProvider.toggleBookmarkSelection(bm.id, true))}
                    onDoubleClick={this.onView}/>);
            },
            createGroup: function (bm) {
                return (<BookmarkGroup
                    key={bm.id}
                    bookmarkData={bm}
                    onOpen={this.dispatchActionGenerator(ActionProvider.openBookmarkGroup(bm.id))}
                    onEdit={this.dispatchActionGenerator(ActionProvider.editBookmark(bm.id))}
                    onDelete={this.dispatchActionGenerator(ActionProvider.removeBookmark(bm.id))}
                    onClick={this.dispatchActionGenerator(ActionProvider.toggleBookmarkSelection(bm.id, true))}
                    onDoubleClick={this.dispatchActionGenerator(ActionProvider.openBookmarkGroup(bm.id))}/>);
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

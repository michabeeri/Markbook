define(['lodash', 'react', 'components/bookmarkList/bookmarkGroup', 'components/bookmarkList/bookmark', 'actionProviders/actions'],
    function (_, React, BookmarkGroup, Bookmark, ActionProvider) {

        'use strict';

        return React.createClass({
            displayName: 'BookmarkList',
            onView: function () {
                window.open('http://www.google.com');
            },
            onClickActionGenerator: function (id) {
                return function (evt) {
                    this.props.dispatch(ActionProvider.toggleBookmarkSelection(id, evt.shiftKey));
                }.bind(this);
            },
            dispatchActionGenerator: function (action) {
                return function () {
                    this.props.dispatch(action);
                }.bind(this);
            },
            createSingle: function (bm) {
                return (<Bookmark
                    key={bm.id}
                    bookmarkData={bm}
                    onView={this.onView}
                    onEdit={this.dispatchActionGenerator(ActionProvider.editBookmark(bm.id))}
                    onDelete={this.dispatchActionGenerator(ActionProvider.removeBookmark(bm.id))}
                    onClick={this.onClickActionGenerator(bm.id)}
                    onDoubleClick={this.onView}/>);
            },
            createGroup: function (bm) {
                return (<BookmarkGroup
                    key={bm.id}
                    bookmarkData={bm}
                    onOpen={this.dispatchActionGenerator(ActionProvider.openBookmarkGroup(bm.id))}
                    onEdit={this.dispatchActionGenerator(ActionProvider.editBookmark(bm.id))}
                    onDelete={this.dispatchActionGenerator(ActionProvider.removeBookmark(bm.id))}
                    onClick={this.onClickActionGenerator(bm.id)}
                    onDoubleClick={this.dispatchActionGenerator(ActionProvider.openBookmarkGroup(bm.id))}/>);
            },
            getFilteredBookmarks: function () {
                var filter = this.props.state.filter;

                function titleCondition(bm) {
                    return !filter || !filter.title || bm.title.indexOf(filter.title) !== -1;
                }

                function tagCondition() {
                    return !filter || !filter.tag;
                }

                return _.filter(this.props.state.bookmarks, function (bm) {
                    return titleCondition(bm) && tagCondition(bm);
                });
            },
            render: function () {
                return (
                    <div className='bookmark-list-container grid'>
                        {_.map(this.getFilteredBookmarks(), function (bm) {
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

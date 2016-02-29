define(['lodash', 'react', 'components/bookmarkList/bookmarkGroup', 'components/bookmarkList/bookmark', 'actionProviders/actions'],
    function (_, React, BookmarkGroup, Bookmark, ActionProvider) {

        'use strict';

        return React.createClass({
            displayName: 'BookmarkList',
            getInitialState: function () {
                return {
                    dragged: null
                };
            },
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
                var dragged = false;
                if (bm.id === this.state.dragged) {
                    dragged = true;
                }
                return (<Bookmark
                    key={bm.id}
                    dataId={'bm' + bm.id}
                    bookmarkData={bm}
                    onView={this.onView}
                    onEdit={this.dispatchActionGenerator(ActionProvider.editBookmark(bm.id))}
                    onDelete={this.dispatchActionGenerator(ActionProvider.removeBookmark(bm.id))}
                    onClick={this.onClickActionGenerator(bm.id)}
                    onDoubleClick={this.onView}
                    dragClass={dragged}
                    dragStart={this.setDragged}
                    dragOver={this.dragReorder}
                    dragEnd={this.setDragged}/>);
            },
            createGroup: function (bm) {
                var dragged = false;
                if (bm.id === this.state.dragged) {
                    dragged = true;
                }
                return (<BookmarkGroup
                    key={bm.id}
                    dataId={'bm' + bm.id}
                    bookmarkData={bm}
                    onOpen={this.dispatchActionGenerator(ActionProvider.openBookmarkGroup(bm.id))}
                    onEdit={this.dispatchActionGenerator(ActionProvider.editBookmark(bm.id))}
                    onDelete={this.dispatchActionGenerator(ActionProvider.removeBookmark(bm.id))}
                    onClick={this.onClickActionGenerator(bm.id)}
                    onDoubleClick={this.dispatchActionGenerator(ActionProvider.openBookmarkGroup(bm.id))}
                    dragClass={dragged}
                    dragStart={this.setDragged}
                    dragOver={this.dragReorder}
                    dragEnd={this.setDragged}/>);
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
            dragReorder: function () {
                //TODO implementation of reorder
            },
            setDragged: function (draggedId) {
                if (this.state.dragged !== draggedId) {
                    this.setState({dragged: draggedId});
                }
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

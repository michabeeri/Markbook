define(['lodash',
        'react',
        'constants',
        'components/bookmarkList/bookmark',
        'actionProviders/actions',
        'utils/bookmarksUtil'],
    function (_, React, Constants, Bookmark, ActionProvider, BookmarksUtil) {

        'use strict';

        return React.createClass({
            displayName: 'BookmarkList',
            getInitialState: function () {
                return {
                    dragged: null,
                    draggedOver: null
                };
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
            dragReorder: function (draggedOverId) {
                if (!this.state.dragged || this.state.dragged === draggedOverId || this.state.draggedOver === draggedOverId) {
                    return;
                }
                this.setState({draggedOver: draggedOverId}, function () {
                    this.props.dispatch(ActionProvider.dragReorder(this.state.dragged, draggedOverId, _.last(this.props.state.currentBookmarkPath)));
                });
            },
            setDragged: function (draggedId) {
                if (this.state.dragged !== draggedId) {
                    this.setState({dragged: draggedId});
                }
            },
            render: function () {
                var currentGroupItems = BookmarksUtil.getCurrentGroupItems(this.props.state.bookmarks, this.props.state.currentBookmarkPath);
                return (
                    <div className='bookmark-list-container grid'>
                        {_.map(currentGroupItems, function (bm) {
                            var dragged = false;
                            if (bm.id === this.state.dragged) {
                                dragged = true;
                            }

                            return (
                                <Bookmark
                                    key={bm.id}
                                    dataId={bm.id}
                                    bookmarkData={bm}
                                    layout={this.props.layout}
                                    state={this.props.state}
                                    dispatch={this.props.dispatch}
                                    modalUtils={this.props.modalUtils}
                                    dragClass={dragged}
                                    dragStart={this.setDragged}
                                    dragOver={this.dragReorder}
                                    dragEnd={this.setDragged}
                                />);
                        }.bind(this))}
                    </div>
                );
            }
        });
    });

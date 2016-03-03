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
                if (!this.state.dragged || this.state.draggedOver === draggedOverId) {
                    return;
                }
                if (this.state.dragged === draggedOverId) {
                    this.setState({draggedOver: draggedOverId});
                } else {
                    this.setState({draggedOver: draggedOverId}, function () {
                        this.props.dispatch(ActionProvider.dragReorder(this.state.dragged, draggedOverId, _.last(this.props.state.currentBookmarkPath)));
                    });
                }
            },
            setDragged: function (draggedId) {
                if (this.state.dragged !== draggedId) {
                    this.setState({dragged: draggedId});
                    this.props.dispatch(ActionProvider.setSortType(Constants.CUSTOM_SORT_TYPE));
                }
            },
            resetDragState: function () {
                this.setState({dragged: null, draggedOver: null});
            },
            render: function () {
                var currentGroupItems = this.props.layout === Constants.layoutType.GRID
                    ? BookmarksUtil.getCurrentGroupItems(this.props.state.bookmarks, this.props.state.currentBookmarkPath)
                    : BookmarksUtil.getItemsByGroupId(this.props.state.bookmarks, Constants.ROOT_GROUP_ID);

                var sortType = this.props.state.sort.sortType;
                if (sortType !== Constants.CUSTOM_SORT_TYPE) {
                    currentGroupItems = BookmarksUtil.sort(currentGroupItems, sortType);
                }
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
                                    dragClass={dragged}
                                    dragStart={this.setDragged}
                                    dragOver={this.dragReorder}
                                    dragEnd={this.resetDragState}
                                />);
                        }.bind(this))}
                    </div>
                );
            }
        });
    });

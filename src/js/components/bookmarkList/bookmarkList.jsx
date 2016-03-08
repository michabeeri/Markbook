define(['lodash',
        'react',
        'constants',
        'actionProviders/actions',
        'utils/bookmarksUtil'],
    function (_, React, Constants, ActionProvider, BookmarksUtil) {

        'use strict';

        return React.createClass({
            displayName: 'BookmarkList',
            getInitialState: function () {
                return {
                    dragged: null,
                    draggedOver: null
                };
            },
            dragReorder: function (draggedOverId) {
                if (!this.state.dragged || this.state.draggedOver === draggedOverId) {
                    return;
                }
                if (this.state.dragged === draggedOverId) {
                    this.setState({draggedOver: draggedOverId});
                } else {
                    this.setState({draggedOver: draggedOverId}, function () {
                        var rootId = this.props.layout === Constants.layoutType.GRID ? _.last(this.props.state.currentBookmarkPath) : this.props.rootId;
                        this.props.dispatch(ActionProvider.dragReorder(this.state.dragged, draggedOverId, rootId));
                    });
                }
            },
            setDragged: function (draggedId) {
                if (this.state.dragged !== draggedId) {
                    this.setState({dragged: draggedId});
                    var sortType = this.props.state.sort.sortType;
                    if (sortType !== Constants.CUSTOM_SORT_TYPE) {
                        this.props.dispatch(ActionProvider.dragReorderInit(sortType, _.last(this.props.state.currentBookmarkPath)));
                        this.props.dispatch(ActionProvider.setSortType(Constants.CUSTOM_SORT_TYPE));
                    }
                }
            },
            resetDragState: function () {
                this.setState({dragged: null, draggedOver: null});
            },
            render: function () {
                var visibleItems = this.props.filteredBookmarks;
                if (!visibleItems) {
                    visibleItems = this.props.layout === Constants.layoutType.GRID
                        ? BookmarksUtil.getCurrentGroupItems(this.props.state.bookmarks, this.props.state.currentBookmarkPath)
                        : BookmarksUtil.getItemsByGroupId(this.props.state.bookmarks, this.props.rootId);
                }

                var sortType = this.props.state.sort.sortType;
                if (sortType !== Constants.CUSTOM_SORT_TYPE) {
                    visibleItems = BookmarksUtil.sort(visibleItems, sortType);
                }

                return (
                    <div>
                        {_.map(visibleItems, function (bm) {
                            var dragged = false;
                            if (bm.id === this.state.dragged) {
                                dragged = true;
                            }

                            return (
                                <this.props.repeaterItem
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
                                    repeaterItem = {this.props.repeaterItem}
                                />);
                        }.bind(this))}
                    </div>
                );
            }
        });
    });

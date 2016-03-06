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
            getFilteredBookmarks: function (filterTerm) {
                var filter = this.props.state.filter;
                var term = filterTerm.term;

                function titleCondition(bm) {
                    return filterTerm.type !== 'title' || bm.title.indexOf(term) !== -1;
                }

                function tagCondition(bm) {
                    return filterTerm.type !== 'tag' || _.findIndex(bm.tags, function (tag) {
                            return tag === filter.tag;
                        }) !== -1;
                }

                return _.filter(this.props.state.bookmarks, function (bm) {
                    return titleCondition(bm) && tagCondition(bm);
                });
            },
            dragReorder: function (draggedOverId) {
                if (!this.state.dragged || this.state.draggedOver === draggedOverId) {
                    return;
                }
                this.setState({draggedOver: draggedOverId}, function () {
                    if (this.state.dragged !== draggedOverId) {
                        this.props.dispatch(ActionProvider.dragReorder(this.state.dragged, draggedOverId, _.last(this.props.state.currentBookmarkPath)));
                    }
                });
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
            resetFilter: function () {
                this.props.dispatch(ActionProvider.setFilter('', ''));
            },
            renderFilterResultsTitle: function (filterTerm, totalResults) {
                var filterResultsTitle = (
                    <div className='app-line-container'>
                        <button className='btn btn-border title-small contained' onClick={this.resetFilter}>Clear Filter</button>
                        <span className='title-small contained'>Found {totalResults} match{totalResults === 1 ? '' : 'es'} for
                            <span className='search-term'> {filterTerm.term}</span> ({filterTerm.type}):</span>
                    </div>
                );
                return filterResultsTitle;
            },
            getFilterTerm: function () {
                var filter = this.props.state.filter;
                if (filter) {
                    if (filter.title) {
                        return {
                            type: 'title',
                            term: filter.title
                        };
                    }
                    if (filter.tag) {
                        return {
                            type: 'tag',
                            term: filter.tag
                        };
                    }
                }
                return null;
            },
            render: function () {
                var visibleItems;
                var filterResultsTitle = null;
                var filterTerm = this.getFilterTerm();
                if (filterTerm) {
                    visibleItems = this.getFilteredBookmarks(filterTerm);
                    filterResultsTitle = this.renderFilterResultsTitle(filterTerm, visibleItems.length);
                } else {
                    visibleItems = this.props.layout === Constants.layoutType.GRID
                        ? BookmarksUtil.getCurrentGroupItems(this.props.state.bookmarks, this.props.state.currentBookmarkPath)
                        : BookmarksUtil.getItemsByGroupId(this.props.state.bookmarks, Constants.ROOT_GROUP_ID);
                }

                var sortType = this.props.state.sort.sortType;
                if (sortType !== Constants.CUSTOM_SORT_TYPE) {
                    visibleItems = BookmarksUtil.sort(visibleItems, sortType);
                }
                return (
                    <div>
                        {filterResultsTitle}
                        <div className='bookmark-list-container grid'>
                            {_.map(visibleItems, function (bm) {
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
                    </div>
                );
            }
        });
    });

define(
    ['react', 'components/toolbar/toolbar', 'components/bookmarkList/bookmarkList', 'components/breadcrumbs/breadCrumbs', 'components/modals/ModalContainer', 'constants', 'actionProviders/actions', 'utils/bookmarksUtil', 'components/mainView/FilterResultsTitle'],
    function (React, ToolBar, BookmarkList, BreadCrumbs, ModalContainer, Constants, actions, BookmarksUtil, FilterResultsTitle) {
        'use strict';
        return React.createClass({
            displayName: 'MainView',
            getInitialState: function () {
                return {
                    layout: Constants.layoutType.GRID,
                    minGridLayoutExceeded: document.body.clientWidth < Constants.GRID_MIN_WIDTH
                };
            },
            componentDidMount: function () {
                window.addEventListener('throttledResize', this.resizeHandler);
            },
            componentWillUnmount: function () {
                window.removeEventListener('throttledResize', this.resizeHandler);
            },
            resizeHandler: function () {
                if (document.body.clientWidth < Constants.GRID_MIN_WIDTH) {
                    this.setState({
                        minGridLayoutExceeded: true,
                        layout: Constants.layoutType.LIST
                    });
                } else if (this.state.minGridLayoutExceeded && document.body.clientWidth >= Constants.GRID_MIN_WIDTH) {
                    this.setState({
                        minGridLayoutExceeded: false,
                        layout: Constants.layoutType.GRID
                    });
                }
            },
            openAddBookMarkModal: function () {
                this.props.dispatch(actions.openBookmarkDataModal());
            },
            shouldRenderBreadCrumbs: function () {
                var filterExists = this.props.state.filter && (this.props.state.filter.title || this.props.state.filter.tag);
                return !filterExists && this.state.layout === Constants.layoutType.GRID;
            },
            getBreadCrumbsComponent: function () {
                return this.shouldRenderBreadCrumbs() ?
                    <BreadCrumbs dispatch={this.props.dispatch}
                                 bookmarks={this.props.state.bookmarks}
                                 currentPath={this.props.state.currentBookmarkPath}/> : null;
            },
            resetFilter: function () {
                this.props.dispatch(actions.setFilter('', ''));
            },
            getFilterResultsTitle: function (filterTerm) {
                this.filteredBookmarks = BookmarksUtil.getFilteredBookmarks(this.props.state.bookmarks, this.props.state.filter, filterTerm);
                return <FilterResultsTitle filterTerm={filterTerm.term}
                                           filterType={filterTerm.type}
                                           totalResults={this.filteredBookmarks.length}
                                           resetFilter={this.resetFilter}/>;
            },
            getContext: function () {
                var filterTerm = BookmarksUtil.getFilterTerm(this.props.state.filter);
                if (filterTerm) {
                    return this.getFilterResultsTitle(filterTerm);
                }
                this.filteredBookmarks = null;
                return this.getBreadCrumbsComponent();
            },
            switchLayout: function () {
                this.setState({
                    layout: this.state.layout === Constants.layoutType.GRID ? Constants.layoutType.LIST : Constants.layoutType.GRID
                });
            },
            render: function () {
                var content;
                var currentBookmarkPath = this.props.state.currentBookmarkPath;

                if (this.props.state.bookmarks.length === 1) { //root group
                    content = (
                        <div>
                            <h1>Welcome</h1>
                            <i className="fa fa-plus fa-3x"></i>
                            <p>Add your first bookmark</p>
                        </div>);
                } else {
                    content = (
                        <div>
                            <ToolBar
                                items={this.props.state.bookmarks}
                                currentGroupId={currentBookmarkPath[currentBookmarkPath.length - 1]}
                                sort={this.props.state.sort}
                                dispatch={this.props.dispatch}
                                layout={this.state.layout}
                                switchLayout={this.switchLayout}
                                minGridLayoutExceeded={this.state.minGridLayoutExceeded}/>
                            {this.getContext()}
                            <BookmarkList dispatch={this.props.dispatch}
                                          state={this.props.state}
                                          layout={this.state.layout}
                                          modalUtils={{lastItemInGroup: this.openRemoveLastItemInGroupModal, groupDelete: this.openGroupDeleteModal}}
                                          filteredBookmarks={this.filteredBookmarks}/>
                        </div>);
                }


                return (
                    <div>
                        {content}
                        <ModalContainer dispatch={this.props.dispatch} state={this.props.state}/>
                        <i className="fa fa-plus-circle fa-3x btn-add" onClick={this.openAddBookMarkModal}></i>
                    </div>
                );
            }
        });
    });

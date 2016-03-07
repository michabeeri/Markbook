define(
    ['react', 'components/toolbar/toolbar', 'components/bookmarkList/bookmarkList', 'components/bookmarkList/bookmark', 'components/breadcrumbs/breadCrumbs', 'components/modals/ModalContainer', 'constants', 'actionProviders/actions', 'utils/bookmarksUtil', 'components/mainView/FilterResultsTitle', 'components/spinner/spinner'],
    function (React, ToolBar, BookmarkList, Bookmark, BreadCrumbs, ModalContainer, Constants, actions, BookmarksUtil, FilterResultsTitle, Spinner) {
        'use strict';
        return React.createClass({
            displayName: 'MainView',
            getInitialState: function () {
                return {
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
                    this.props.dispatch(actions.setLayout(Constants.layoutType.LIST));
                    this.setState({
                        minGridLayoutExceeded: true
                    });
                } else if (this.state.minGridLayoutExceeded) {
                    this.props.dispatch(actions.setLayout(Constants.layoutType.GRID));
                    this.setState({
                        minGridLayoutExceeded: false
                    });
                }
            },
            openAddBookMarkModal: function () {
                this.props.dispatch(actions.openBookmarkDataModal());
            },
            shouldRenderBreadCrumbs: function (layout) {
                var filterExists = this.props.state.filter && (this.props.state.filter.title || this.props.state.filter.tag);
                return !filterExists && layout === Constants.layoutType.GRID;
            },
            getBreadCrumbsComponent: function (layout) {
                return this.shouldRenderBreadCrumbs(layout) ?
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
            getContext: function (layout) {
                var filterTerm = BookmarksUtil.getFilterTerm(this.props.state.filter);
                if (filterTerm) {
                    return this.getFilterResultsTitle(filterTerm);
                }
                this.filteredBookmarks = null;
                return this.getBreadCrumbsComponent(layout);
            },
            switchLayout: function () {
                var newLayout = this.props.state.layout.layoutType === Constants.layoutType.GRID ? Constants.layoutType.LIST : Constants.layoutType.GRID;
                this.props.dispatch(actions.setLayout(newLayout));
            },
            render: function () {
                var content;
                var currentBookmarkPath = this.props.state.currentBookmarkPath;
                var layout = this.props.state.layout.layoutType;

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
                                layout={layout}
                                switchLayout={this.switchLayout}
                                minGridLayoutExceeded={this.state.minGridLayoutExceeded}/>
                            {this.getContext(layout)}
                            <BookmarkList dispatch={this.props.dispatch}
                                          state={this.props.state}
                                          layout={layout}
                                          repeaterItem={Bookmark}
                                          rootId={Constants.ROOT_GROUP_ID}
                                          filteredBookmarks={this.filteredBookmarks}/>
                        </div>);
                }

                return (
                    <div>
                        {this.props.state.flags.hasOwnProperty(Constants.BOOKMARKS_LOADED) ?
                            <div>
                                {content}
                                <ModalContainer dispatch={this.props.dispatch} state={this.props.state}/>
                                <i className="fa fa-plus-circle fa-3x btn-add" onClick={this.openAddBookMarkModal}></i>
                            </div> :
                            <Spinner />
                        }
                    </div>
                );
            }
        });
    });

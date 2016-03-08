define(
    ['lodash', 'react', 'components/toolbar/toolbar', 'components/bookmarkList/bookmarkList', 'components/bookmarkList/bookmark', 'components/breadcrumbs/breadCrumbs', 'components/modals/ModalContainer', 'constants', 'actionProviders/actions', 'utils/bookmarksUtil', 'utils/localStorageUtil', 'components/mainView/FilterResultsTitle', 'components/spinner/spinner'],
    function (_, React, ToolBar, BookmarkList, Bookmark, BreadCrumbs, ModalContainer, Constants, actions, BookmarksUtil, LocalStorageUtil, FilterResultsTitle, Spinner) {
        'use strict';
        return React.createClass({
            displayName: 'MainView',
            getInitialState: function () {
                return {
                    minGridLayoutExceeded: document.body.clientWidth < Constants.GRID_MIN_WIDTH
                };
            },
            componentWillMount: function () {
                this.props.dispatch(actions.setLayout(this.getDefaultLayout()));
                this.props.dispatch(actions.setSortType(this.getDefaultSortType()));
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
                    this.props.dispatch(actions.setLayout(this.getDefaultLayout()));
                    this.setState({
                        minGridLayoutExceeded: false
                    });
                }
            },
            openAddBookMarkModal: function () {
                this.props.dispatch(actions.openBookmarkDataModal());
            },
            goBack: function () {
                this.props.dispatch(actions.navigateToPreviousGroup(this.props.state.currentBookmarkPath[this.props.state.currentBookmarkPath.length - 2]));
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
            getDefaultLayout: function () {
                var defaultLayout = Constants.layoutType.GRID;
                var localStorage = LocalStorageUtil.getItem(Constants.LOCAL_STORAGE_KEY);
                if (localStorage && localStorage.hasOwnProperty(Constants.LOCAL_STORAGE_LAYOUT)) {
                    defaultLayout = localStorage[Constants.LOCAL_STORAGE_LAYOUT];
                }
                return defaultLayout;
            },
            getDefaultSortType: function () {
                var defaultSort = Constants.sortTypes.DATE_ASC;
                var localStorage = LocalStorageUtil.getItem(Constants.LOCAL_STORAGE_KEY);
                if (localStorage && localStorage.hasOwnProperty(Constants.LOCAL_STORAGE_SORT)) {
                    defaultSort = localStorage[Constants.LOCAL_STORAGE_SORT];
                }
                return defaultSort;
            },
            render: function () {
                var content;
                var currentBookmarkPath = this.props.state.currentBookmarkPath;
                var layout = this.props.state.layout.layoutType;

                if (this.props.state.bookmarks.length === 1) { //root group
                    content = (
                        <div className = 'empty-state-container fixed-center'>
                            <h1 className = 'empty-state-container-title'>Welcome</h1>
                            <img src='img/bookmark.png' alt='bookmark' width='200' height='200'/>
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
                                <a className="btn btn-add fixed-bottom " onClick={this.openAddBookMarkModal}><i className="fa fa-plus-circle"></i></a>
                                {content}
                                {this.props.state.flags[Constants.FIRST_VISIT_FLAG] ? <div className="helper-message fixed-bottom tooltip">Click here to add a new bookmark</div> : null}
                                <ModalContainer dispatch={this.props.dispatch} state={this.props.state}/>
                            </div> :
                            <Spinner />
                        }
                    </div>
                );
            }
        });
    });

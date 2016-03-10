define(
    ['lodash', 'react', 'components/toolbar/toolbar', 'components/bookmarkList/bookmarkList', 'components/bookmarkList/bookmark', 'components/breadcrumbs/breadCrumbs', 'components/modals/ModalContainer', 'constants', 'actionProviders/actions', 'utils/bookmarksUtil', 'utils/localStorageUtil', 'components/mainView/FilterResultsTitle', 'components/spinner/spinner', 'components/mainView/mainViewEmptyState'],
    function (_, React, ToolBar, BookmarkList, Bookmark, BreadCrumbs, ModalContainer, Constants, actions, BookmarksUtil, LocalStorageUtil, FilterResultsTitle, Spinner, MainViewEmptyState) {
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
                    if (this.props.state.layout.layoutType === Constants.layoutType.GRID) {
                        this.props.dispatch(actions.setLayout(Constants.layoutType.LIST));
                        this.setState({minGridLayoutExceeded: true});
                    }
                } else if (this.state.minGridLayoutExceeded) {
                    this.props.dispatch(actions.setLayout(Constants.layoutType.GRID));
                    this.setState({minGridLayoutExceeded: false});
                }
            },
            openAddBookMarkModal: function () {
                this.props.dispatch(actions.openBookmarkDataModal());
            },
            undo: function () {
                this.props.dispatch(actions.undo());
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
                    content = <MainViewEmptyState openAddBookMarkModal={this.openAddBookMarkModal}/>;
                } else {
                    content = (
                        <div>
                            <a className="btn btn-add fixed-bottom" onClick={this.openAddBookMarkModal}><i className="fa fa-plus-circle"></i></a>
                            <ToolBar
                                items={this.props.state.bookmarks}
                                currentGroupId={currentBookmarkPath[currentBookmarkPath.length - 1]}
                                sort={this.props.state.sort}
                                dispatch={this.props.dispatch}
                                layout={layout}
                                switchLayout={this.switchLayout}
                                minGridLayoutExceeded={this.state.minGridLayoutExceeded}/>
                            <div className='bookmarks-container'>
                                {this.getContext(layout)}
                                <div className="bookmark-list-container">
                                    <BookmarkList dispatch={this.props.dispatch}
                                                  state={this.props.state}
                                                  layout={layout}
                                                  repeaterItem={Bookmark}
                                                  rootId={Constants.ROOT_GROUP_ID}
                                                  filteredBookmarks={this.filteredBookmarks}/>
                                </div>
                            </div>
                        </div>);
                }

                return (
                    <div>
                        {this.props.state.flags.hasOwnProperty(Constants.BOOKMARKS_LOADED) ?
                            <div class='relative'>
                                <a className="btn btn-undo fixed-bottom " onClick={this.undo}><i className="fa fa-undo"></i></a>
                                {content}
                                {this.props.state.flags[Constants.FIRST_VISIT_FLAG]
                                    ? <div className="helper-message fixed-bottom tooltip">Click here to add a new bookmark</div>
                                    : null}
                                <ModalContainer dispatch={this.props.dispatch} state={this.props.state}/>
                            </div> :
                            <Spinner />
                        }
                    </div>
                );
            }
        });
    });

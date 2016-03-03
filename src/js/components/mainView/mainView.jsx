define(
    ['react', 'components/toolbar/toolbar', 'components/bookmarkList/bookmarkList', 'components/breadcrumbs/breadCrumbs', 'components/modals/ModalContainer', 'constants', 'actionProviders/actions'],
    function (React, ToolBar, BookmarkList, BreadCrumbs, ModalContainer, Constants, actions) {
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
                return this.state.layout === Constants.layoutType.GRID;
            },
            getBreadCrumbsComponent: function () {
                return this.shouldRenderBreadCrumbs() ?
                    <BreadCrumbs dispatch={this.props.dispatch}
                                 bookmarks={this.props.state.bookmarks}
                                 currentPath={this.props.state.currentBookmarkPath}/> : null;
            },
            switchLayout: function () {
                this.setState({
                    layout: this.state.layout === Constants.layoutType.GRID ? Constants.layoutType.LIST : Constants.layoutType.GRID
                });
            },
            render: function () {
                return (
                    <div>
                        <ToolBar
                            items={this.props.state.bookmarks}
                            sort={this.props.state.sort}
                            dispatch={this.props.dispatch}
                            layout={this.state.layout}
                            switchLayout={this.switchLayout}
                            minGridLayoutExceeded={this.state.minGridLayoutExceeded}/>
                        {this.getBreadCrumbsComponent()}
                        <BookmarkList dispatch={this.props.dispatch}
                                      state={this.props.state}
                                      layout={this.state.layout}
                                      modalUtils={{lastItemInGroup: this.openRemoveLastItemInGroupModal, groupDelete: this.openGroupDeleteModal}}/>
                        <ModalContainer
                            dispatch={this.props.dispatch}
                            state={this.props.state}/>
                        <i className="fa fa-plus-circle fa-3x btn-add" onClick={this.openAddBookMarkModal}></i>
                    </div>
                );
            }
        });
    });

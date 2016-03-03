define(['react', 'components/toolbar/toolbar', 'components/bookmarkList/bookmarkList', 'components/breadcrumbs/breadCrumbs', 'components/modals/ModalContainer', 'constants', 'actionProviders/actions'],
    function (React, ToolBar, BookmarkList, BreadCrumbs, ModalContainer, Constants, actions) {
        'use strict';
        return React.createClass({
            displayName: 'MainView',
            getInitialState: function () {
                return {
                    layout: Constants.layoutType.GRID
                };
            },
            componentDidMount: function () {
                window.addEventListener('throttledResize', this.resizeHandler);
            },
            componentWillUnmount: function () {
                window.removeEventListener('throttledResize', this.resizeHandler);
            },
            resizeHandler: function () {
                this.setState({
                    layout: document.body.clientWidth < Constants.GRID_MIN_WIDTH
                        ? Constants.layoutType.LIST
                        : Constants.layoutType.GRID
                });
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
                var content;

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
                            <ToolBar {...this.props} layout={this.state.layout} switchLayout={this.switchLayout}/>
                            {this.getBreadCrumbsComponent()}
                            <BookmarkList dispatch={this.props.dispatch} state={this.props.state}
                                          layout={this.state.layout}
                                          modalUtils={{lastItemInGroup: this.openRemoveLastItemInGroupModal, groupDelete: this.openGroupDeleteModal}}/>
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

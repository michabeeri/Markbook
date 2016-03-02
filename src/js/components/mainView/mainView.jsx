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
            render: function () {
                return (
                    <div>
                        <ToolBar {...this.props}/>
                        <BreadCrumbs
                            dispatch={this.props.dispatch}
                            bookmarks={this.props.state.bookmarks}
                            currentPath={this.props.state.currentBookmarkPath}/>
                        <BookmarkList dispatch={this.props.dispatch} state={this.props.state}
                                      layout={this.state.layout}
                                      modalUtils={{lastItemInGroup: this.openRemoveLastItemInGroupModal, groupDelete: this.openGroupDeleteModal}}/>
                        <ModalContainer dispatch={this.props.dispatch} state={this.props.state}/>
                        <i className="fa fa-plus-circle fa-3x btn-add" onClick={this.openAddBookMarkModal}></i>
                    </div>
                );
            }
        });
    });

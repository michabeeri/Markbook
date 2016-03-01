define(['react', 'components/bookmarkList/bookmarkList', 'components/modals/ModalContainer', 'constants'],
    function (React, BookmarkList, ModalContainer, Constants) {
    'use strict';
    return React.createClass({
        displayName: 'MainView',
        getInitialState: function () {
            return {
                openedModal: Constants.eModalType.NONE,
                layout: Constants.layoutType.GRID
            };
        },
        openAddBookMarkModal: function () {
            this.setState({
                openedModal: Constants.eModalType.MODAL_ADD_BOOKMARK
            });
        },
        closeModal: function () {
            this.setState({
                openedModal: Constants.eModalType.NONE
            });
        },
        render: function () {
            return (
                <div>
                    <BookmarkList dispatch={this.props.dispatch} state={this.props.state} layout={this.state.layout}/>
                    <ModalContainer dispatch={this.props.dispatch} closeModal={this.closeModal} openedModal={this.state.openedModal}/>
                    <i className="fa fa-plus-circle fa-3x btn-add" onClick={this.openAddBookMarkModal}></i>
                </div>
            );
        }
    });
});

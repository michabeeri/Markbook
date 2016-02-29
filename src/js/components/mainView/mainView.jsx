define(['react', 'components/bookmarkList/bookmarkList', 'components/modals/ModalContainer', 'constants'],
    function (React, BookmarkList, ModalContainer, constants) {
    'use strict';
    return React.createClass({
        displayName: 'MainView',
        getInitialState: function () {
            return {
                openedModal: constants.eModalType.NONE
            };
        },
        openAddBookMarkModal: function () {
            this.setState({
                openedModal: constants.eModalType.MODAL_ADD_BOOKMARK
            });
        },
        closeModal: function () {
            this.setState({
                openedModal: constants.eModalType.NONE
            });
        },
        render: function () {
            return (
                <div>
                    <BookmarkList {...this.props}/>
                    <ModalContainer closeModal={this.closeModal} openedModal={this.state.openedModal}/>
                    <i className="fa fa-plus-circle fa-3x" onClick={this.openAddBookMarkModal}></i>
                </div>
            );
        }
    });
});

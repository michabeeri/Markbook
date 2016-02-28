define(['react', 'components/mainView/mainView', 'components/mainView/topbar', 'components/modals/ModalContainer', 'constants'],
    function (React, MainView, TopBar, ModalContainer, constants) {

        'use strict';
        return React.createClass({
            displayName: 'AppView',
            getInitialState: function () {
                return {
                    items: this.props.items,
                    username: 'user@wix.com',
                    openedModal: constants.eModalType.NONE
                };
            },
            addItem: function () {
                return false;
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
                    <div className='main'>
                        <TopBar username={this.state.username}/>
                        <MainView items={this.state.items}/>
                        <ModalContainer closeModal={this.closeModal} openedModal={this.state.openedModal}/>
                        <i className="fa fa-plus-circle fa-3x addBookmarkButton"
                           onClick={this.openAddBookMarkModal}></i>
                    </div>
                );
            }
        });
    });

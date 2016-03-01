define(['react', 'components/modals/AddBookmarkModal', 'components/modals/Modal', 'constants', 'lodash'],
    function (React, AddBookmarkModal, Modal, constants, _) {
        'use strict';

        return React.createClass({
            displayName: 'Modal container',
            contentProps: {},
            propTypes: {
                openedModal: React.PropTypes.oneOf(_.values(constants.eModalType)),
                closeModal: React.PropTypes.func.isRequired,
                dispatch: React.PropTypes.func.isRequired
            },
            getModalContent: function () {
                //find Modal to be opened in Modals array
                var indexOfModal = _.findIndex(constants.modals, {key: this.props.openedModal});
                var modalDetails = constants.modals[indexOfModal];

                if (modalDetails.rendered) {

                    var contentProps = {};
                    for (var i = 0; i < modalDetails.props.length; i++) {
                        var value = modalDetails.props[i];
                        contentProps[value] = this.props[value];
                    }

                    return React.createElement(
                        modalDetails.class,
                        contentProps
                    );
                }

                return null;
            },
            render: function () {
                //prevent scrolling of web page when modal is opened
                //TODO: change to component Overlay
                document.body.style.overflow = (this.props.openedModal !== constants.eModalType.NONE) ? 'hidden' : 'none';

                var content = this.getModalContent();
                if (content) {
                    return (<Modal className='modal modal-opened' closeModal={this.props.closeModal}>
                        {content}
                    </Modal>);
                }

                return (<div></div>);
            }
        });
    }
);


// <AddBookmarkModal dispatch={this.props.dispatch} closeModal={this.props.closeModal}/>

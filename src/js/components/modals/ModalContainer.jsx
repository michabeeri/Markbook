define(['react', 'components/modals/AddBookmarkModal', 'components/modals/Modal', 'components/modals/modalData', 'lodash'],
    function (React, AddBookmarkModal, Modal, modalData, _) {
        'use strict';

        return React.createClass({
            displayName: 'Modal container',
            contentProps: {},
            propTypes: {
                openedModal: React.PropTypes.oneOf(_.values(modalData.eModalType)),
                closeModal: React.PropTypes.func.isRequired,
                dispatch: React.PropTypes.func.isRequired,
                state: React.PropTypes.object
            },
            getModalContent: function () {
                var indexOfModal = _.findIndex(modalData.modals, {key: this.props.openedModal});
                var modalDetails = modalData.modals[indexOfModal];

                if (modalDetails !== undefined) {

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
                document.body.style.overflow = (this.props.openedModal !== modalData.eModalType.NONE) ? 'hidden' : 'none';

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

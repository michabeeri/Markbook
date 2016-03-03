define(['react', 'constants', 'components/modals/Modal', 'components/modals/modalData', 'lodash', 'actionProviders/actions'],
    function (React, Constants, Modal, modalData, _, actions) {
        'use strict';

        return React.createClass({
            displayName: 'Modal container',
            contentProps: {},
            propTypes: {
                dispatch: React.PropTypes.func.isRequired,
                state: React.PropTypes.object
            },
            getModalContent: function () {
                if (!this.props.state.modals) {
                    return null;
                }

                var indexOfModal = _.findIndex(modalData, {key: this.props.state.modals.type});
                var modalDetails = modalData[indexOfModal];

                if (_.isUndefined(modalDetails)) {
                    return null;
                }

                return modalDetails.class;
            },
            close: function () {
                this.props.dispatch(actions.closeModal());
            },
            render: function () {
                //prevent scrolling of web page when modal is opened
                //TODO: change to component Overlay
                document.body.style.overflow = (this.props.openedModal !== Constants.eModalType.NONE) ? 'hidden' : 'none';

                var contentClass = this.getModalContent();
                if (contentClass) {
                    var contentComponent = React.createElement(
                        contentClass,
                        {
                            dispatch: this.props.dispatch,
                            state: this.props.state,
                            close: this.close
                        }
                    );

                    return (
                        <Modal className='modal modal-opened' close={this.close} dispatch={this.props.dispatch}>
                            {contentComponent}
                        </Modal>);
                }

                return (<div></div>);
            }
        });
    }
);

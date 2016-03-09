define(['react', 'constants', 'components/modals/Modal', 'components/modals/modalData', 'lodash', 'actionProviders/actions', 'components/modals/Overlay'],
    function (React, Constants, Modal, modalData, _, actions, Overlay) {
        'use strict';

        var CSSTransitionGroup = React.addons.CSSTransitionGroup;

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
                var contentClass = this.getModalContent();
                var renderedComponent = null;
                if (contentClass) {
                    var contentComponent = React.createElement(
                        contentClass,
                        {
                            dispatch: this.props.dispatch,
                            state: this.props.state,
                            close: this.close
                        }
                    );

                    renderedComponent = (<Overlay>
                        <Modal className='modal modal-opened' close={this.close} dispatch={this.props.dispatch}>
                            {contentComponent}
                        </Modal>
                    </Overlay>);
                }


                return ( <CSSTransitionGroup
                        component="div"
                        transitionName="modal-animation"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}>
                        {renderedComponent}
                    </CSSTransitionGroup>
                );
            }
        });
    }
);

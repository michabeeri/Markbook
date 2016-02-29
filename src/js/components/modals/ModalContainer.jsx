define(['react', 'components/modals/AddBookmarkModal', 'constants', 'lodash'],
    function (React, AddBookmarkModal, constants, _) {
        'use strict';

        return React.createClass({
            displayName: 'Modal container',
            propTypes: {
                openedModal: React.PropTypes.oneOf(_.values(constants.eModalType)),
                closeModal: React.PropTypes.func.isRequired,
                dispatch: React.PropTypes.func.isRequired
            },
            render: function () {
                var classNameAddBookmark = 'modal modal-closed';

                switch (this.props.openedModal) {
                    case constants.eModalType.MODAL_ADD_BOOKMARK:
                    {
                        classNameAddBookmark = 'modal modal-opened';
                        break;
                    }
                }

                //prevent scrolling of web page when modal is opened
                //TODO: change to component Overlay
                document.body.style.overflow = (this.props.openedModal !== constants.eModalType.NONE) ? 'hidden' : 'none';

                return (
                    <div>
                        <AddBookmarkModal dispatch={this.props.dispatch} classNameAddBookmark={classNameAddBookmark} closeModal={this.props.closeModal}/>
                    </div>
                );
            }
        });
    }
);

define(['react', 'components/modals/AddBookmarkModal', 'constants'],
    function (React, AddBookmarkModal, constants) {
        'use strict';

        return React.createClass({
            displayName: 'Modal container',
            propTypes: {
                classNameAddBookmark: React.PropTypes.string.isRequired,
                closeModal: React.PropTypes.func.isRequired
            },
            render: function () {
                var classNameAddBookmark = 'modalDialog closed';

                switch (this.props.openedModal) {
                    case constants.eModalType.MODAL_ADD_BOOKMARK:
                    {
                        classNameAddBookmark = 'modalDialog opened';
                        break;
                    }
                }

                //prevent scrolling of web page when modal is opened
                document.body.style.overflow = (this.props.openedModal !== constants.eModalType.NONE) ? 'hidden' : 'none';

                return (
                    <div>
                        <AddBookmarkModal classNameAddBookmark={classNameAddBookmark} closeModal={this.props.closeModal}/>
                    </div>
                );
            }
        });
    }
);

define(['react', 'components/modals/Modal'],
    function (React, Modal) {
        'use strict';

        return React.createClass({
            displayName: 'AddBookmarkModal',
            propTypes: {
                classNameAddBookmark: React.PropTypes.string.isRequired,
                closeModal: React.PropTypes.func.isRequired
            },
            render: function () {
                return (
                        <Modal className={this.props.classNameAddBookmark} closeModal={this.props.closeModal}>
                            <h1>Add Bookmark modal soon will be here</h1>
                            <p>Add Bookmark content</p>
                        </Modal>
                );
            }
        });
    }
);

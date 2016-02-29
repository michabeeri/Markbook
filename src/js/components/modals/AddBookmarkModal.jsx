define(['react', 'components/modals/Modal', 'actionProviders/actions'],
    function (React, Modal, actions) {
        'use strict';

        return React.createClass({
            displayName: 'AddBookmarkModal',
            propTypes: {
                classNameAddBookmark: React.PropTypes.string.isRequired,
                closeModal: React.PropTypes.func.isRequired,
                dispatch: React.PropTypes.func.isRequired
            },
            addBookmark: function () {
                this.props.dispatch(actions.addBookmark('Demo title', new Date()));
            },
            render: function () {
                return (
                    <Modal className={this.props.classNameAddBookmark} closeModal={this.props.closeModal}>
                        <h1>Add Bookmark modal soon will be here</h1>
                        <p>Add Bookmark content</p>
                        <button onClick={this.addBookmark}>Add Demo Bookmark</button>
                    </Modal>
                );
            }
        });
    }
);

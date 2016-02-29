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
                var bookMarkName = this.refs.bookMarkName.value;
                this.props.dispatch(actions.addBookmark(bookMarkName, new Date()));
                this.props.closeModal();
            },
            render: function () {
                return (
                    <Modal className={this.props.classNameAddBookmark} closeModal={this.props.closeModal}>
                        <h1>Add Bookmark modal soon will be here</h1>
                        <p>Add Bookmark content</p>
                        <input type="text" ref="bookMarkName" defaultValue="" placeholder="Name your bookmark" autofocus/>
                        <button onClick={this.addBookmark}>Add Demo Bookmark</button>
                    </Modal>
                );
            }
        });
    }
);

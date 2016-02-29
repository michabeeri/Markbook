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
                var bookMarkUrl = this.refs.bookMarkUrl.value;
                this.props.dispatch(actions.addBookmark(bookMarkName, bookMarkUrl));
                this.props.closeModal();
            },
            render: function () {
                return (
                    <Modal className={this.props.classNameAddBookmark} closeModal={this.props.closeModal}>
                        <h1>Add Bookmark</h1>
                        <input type="text" ref="bookMarkName" placeholder="Name your bookmark"
                               className="input" autofocus/>
                        <input type="text" ref="bookMarkUrl" placeholder="Paste url to bookmark"
                               className="input"/>
                        <button onClick={this.addBookmark} className="btn">Add Bookmark</button>
                    </Modal>
                );
            }
        });
    }
);




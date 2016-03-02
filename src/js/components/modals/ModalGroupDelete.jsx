define(['react', 'actionProviders/actions'],
    function (React, actions) {
        'use strict';

        return React.createClass({
            displayName: 'AddBookmarkModal',
            propTypes: {
                closeModal: React.PropTypes.func.isRequired,
                dispatch: React.PropTypes.func.isRequired,
                bookmarkId: React.PropTypes.string.isRequired
            },
            DeleteItemAndGroup: function () {
                this.props.dispatch(actions.removeBookmark(this.props.bookmarkId));
                this.props.closeModal();
            },
            render: function () {
                return (<div>
                        <h1>Wait!</h1>
                        <p>You are deleting a group with N items</p>
                        <p>Hmmm...</p>
                        <button onClick={this.DeleteItemAndGroup} className="btn">Delete</button>
                        <p>I know, don't care</p>
                        <button onClick={this.props.closeModal} className="btn">Cancel</button>
                    </div>
                );
            }
        });
    }
);

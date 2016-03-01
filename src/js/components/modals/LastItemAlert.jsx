define(['react', 'actionProviders/actions'],
    function (React, actions) {
        'use strict';

        return React.createClass({
            displayName: 'AddBookmarkModal',
            propTypes: {
                closeModal: React.PropTypes.func.isRequired,
                dispatch: React.PropTypes.func.isRequired
            },
            DeleteItemAndGroup: function () {
                this.props.dispatch(actions.removeLastBookmarkInGroup());
                this.props.closeModal();
            },
            render: function () {
                return (<div>
                        <h1>Note!</h1>
                        <p>This is the only item in the group.</p>
                        <p>Deleting it will romove the group as well</p>
                        <button onClick={this.DeleteItemAndGroup} className="btn">Delete</button>
                        <button onClick={this.props.closeModal} className="btn">Cancel</button>
                    </div>

                );
            }
        });
    }
);




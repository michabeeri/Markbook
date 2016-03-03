define(['react', 'actionProviders/actions'],
    function (React, actions) {
        'use strict';

        return React.createClass({
            displayName: 'LastBookmarkInGroupAlert',
            propTypes: {
                close: React.PropTypes.func.isRequired,
                dispatch: React.PropTypes.func.isRequired,
                state: React.PropTypes.object.isRequired
            },
            DeleteEmptyGroups: function () {
                if (this.props.state.modals) {
                    this.props.dispatch(actions.removeBookmark(this.props.state.modals.id));
                    this.props.close();
                }
            },
            render: function () {
                return (<div>
                        <h1>Note!</h1>
                        <p>This is the only item in the group.</p>
                        <p>Deleting it will romove the group as well</p>
                        <button id="lastBookmarkDelete" onClick={this.DeleteEmptyGroups} className="btn">Delete</button>
                        <button id="lastBookmarkCancelDelete" onClick={this.props.close} className="btn">Cancel</button>
                    </div>
                );
            }
        });
    }
);




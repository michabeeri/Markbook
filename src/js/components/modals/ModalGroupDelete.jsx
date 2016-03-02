define(['react', 'actionProviders/actions'],
    function (React, actions) {
        'use strict';

        return React.createClass({
            displayName: 'GroupDeleteAlert',
            propTypes: {
                dispatch: React.PropTypes.func.isRequired,
                state: React.PropTypes.object.isRequired,
                close: React.PropTypes.func.isRequired
            },
            DeleteGroup: function () {
                if (this.props.state.modals) {
                    this.props.dispatch(actions.removeBookmark(this.props.state.modals.id));
                    this.props.close();
                }
            },
            DeleteGroupAndReparentChildren: function () {
                if (this.props.state.modals) {
                    this.props.dispatch(actions.removeAndReparent(this.props.state.modals.id));
                    this.props.close();
                }
            },
            render: function () {
                return (<div>
                        <h1>Wait!</h1>
                        <p>You are deleting a group with N items</p>
                        <p>Hmmm...</p>
                        <button onClick={this.DeleteGroupAndReparentChildren} className="btn">Delete group, Keep Children</button>
                        <p>I know, don't care</p>
                        <button onClick={this.DeleteGroup} className="btn">Delete it all</button>
                    </div>
                );
            }
        });
    }
);

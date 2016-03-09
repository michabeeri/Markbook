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
                    this.props.dispatch(actions.removeBookmark([this.props.state.modals.id]));
                    this.props.close();
                }
            },
            render: function () {
                return (<div className="content-short">
                        <header className='header'>
                            <h1 className='title title-large'>Note!</h1>
                        </header>

                        <p className="modal-text">This is the only item in the group.</p>
                        <p className="modal-text"> Deleting it will romove the group as well</p>
                        <form className='form'>
                            <div className="action-list">
                                <button id="lastBookmarkDelete" onClick={this.DeleteEmptyGroups} className="btn">Delete
                                </button>
                                <button id="lastBookmarkCancelDelete" onClick={this.props.close} className="btn">Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                );
            }
        });
    }
);




define(['react', 'actionProviders/actions', 'utils/bookmarksUtil'],
    function (React, actions, BookmarksUtil) {
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
                    this.props.dispatch(actions.removeBookmark([this.props.state.modals.id]));
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
                var bookmark = BookmarksUtil.getBookmarkById(this.props.state.bookmarks, this.props.state.modals.id);

                var numOfBookmarks = 0;

                if (bookmark.children) {
                    numOfBookmarks = bookmark.children.length;
                }

                var itemsStr = (numOfBookmarks > 1) ? 'items' : 'item';

                return (<div className="content-short">
                        <header className='header'>
                            <h1 className='title title-large'>Wait!</h1>
                        </header>
                        <div className='form'>
                            <p className="modal-text">You are deleting a group with {numOfBookmarks} {itemsStr}</p>
                            <div className="action-with-lead"><span className="lead">Hmmm...</span>
                                <button id="reparentChildren" onClick={this.DeleteGroupAndReparentChildren}
                                        className="btn btn-long action">
                                    Delete group, Keep Children
                                </button>
                            </div>
                            <div className="action-with-lead"><span className="lead">I know, don't care</span>
                                <button id="deleteAll" onClick={this.DeleteGroup} className="btn btn-long action">Delete
                                    it all
                                </button>
                            </div>
                        </div>
                    </div>
                );
            }
        });
    }
);

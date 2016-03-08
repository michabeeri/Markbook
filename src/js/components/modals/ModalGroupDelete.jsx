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

                return (<div>
                        <h1>Wait!</h1>
                        <p>You are deleting a group with {numOfBookmarks} items</p>
                        <p>Hmmm...</p>
                        <button id="reparentChildren" onClick={this.DeleteGroupAndReparentChildren} className="btn">
                            Delete group, Keep Children
                        </button>
                        <p>I know, don't care</p>
                        <button id="deleteAll" onClick={this.DeleteGroup} className="btn">Delete it all</button>
                    </div>
                );
            }
        });
    }
);

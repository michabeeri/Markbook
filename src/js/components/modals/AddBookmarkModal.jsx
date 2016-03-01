define(['react', 'components/modals/Modal', 'actionProviders/actions'],
    function (React, Modal, actions) {
        'use strict';

        var LinkedStateMixin = React.addons.LinkedStateMixin;

        return React.createClass({
            mixins: [LinkedStateMixin],
            displayName: 'AddBookmarkModal',
            propTypes: {
                closeModal: React.PropTypes.func.isRequired,
                dispatch: React.PropTypes.func.isRequired
            },
            getInitialState: function () {
                return {
                    bookmarkName: '',
                    bookmarkUrl: ''
                };
            },
            addBookmark: function () {
                this.props.dispatch(actions.addBookmark(this.state.bookmarkName, this.state.bookmarkUrl));
                this.props.closeModal();
            },
            render: function () {
                return (<div>
                        <h1>Add Bookmark</h1>
                        <input name="BookmarkName" type="text" valueLink={this.linkState('bookmarkName')}
                               placeholder="Name your bookmark"
                               className="input" autofocus/>
                        <input name="BookmarkUrl" type="text" valueLink={this.linkState('bookmarkUrl')}
                               placeholder="Paste url to bookmark"
                               className="input"/>
                        <button onClick={this.addBookmark} className="btn">Add Bookmark</button>
                    </div>

                );
            }
        });
    }
);




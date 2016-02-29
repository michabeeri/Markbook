define(['react', 'components/modals/Modal', 'actionProviders/actions'],
    function (React, Modal, actions) {
        'use strict';

        var LinkedStateMixin = React.addons.LinkedStateMixin;

        return React.createClass({
            mixins: [LinkedStateMixin],
            displayName: 'AddBookmarkModal',
            propTypes: {
                classNameAddBookmark: React.PropTypes.string.isRequired,
                closeModal: React.PropTypes.func.isRequired,
                dispatch: React.PropTypes.func.isRequired
            },
            getInitialState: function () {
                return {
                    bookmarkName: '',
                    bookmarkUrl: '',
                    tags: []
                };
            },
            addBookmark: function () {
                this.props.dispatch(actions.addBookmark(this.state.bookmarkName, this.state.bookmarkUrl));
                this.props.closeModal();
            },
            addTag: function (tag) {
                this.state.tags.push(tag);
                this.setState({
                    tags: this.state.tags
                });
            },
            removeTag: function (tag) {
                _.pull(this.state.tags, tag);
                this.setState({
                    tags: this.state.tags
                });
            },
            render: function () {
                return (
                    <Modal className={this.props.classNameAddBookmark} closeModal={this.props.closeModal}>
                        <h1>Add Bookmark</h1>
                        <input type="text" valueLink={this.linkState('bookmarkName')} placeholder="Name your bookmark"
                               className="input" autofocus/>
                        <input type="text" valueLink={this.linkState('bookmarkUrl')} placeholder="Paste url to bookmark"
                               className="input"/>
                        <TagsContainer tags={this.state.tags} addTag={this.addTag} removeTag={this.removeTag}/>
                        <button onClick={this.addBookmark} className="btn">Add Bookmark</button>
                    </Modal>
                );
            }
        });
    }
);




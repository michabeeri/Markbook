define(['react', 'lodash', 'components/modals/Modal', 'actionProviders/actions', 'components/tags/tagsContainer'],
    function (React, _, Modal, actions, TagsContainer) {
        'use strict';

        return React.createClass({
            displayName: 'AddBookmarkModal',
            propTypes: {
                classNameAddBookmark: React.PropTypes.string.isRequired,
                closeModal: React.PropTypes.func.isRequired,
                dispatch: React.PropTypes.func.isRequired
            },
            getInitialState: function () {
                return {
                    tags: []
                };
            },
            addBookmark: function () {
                var bookMarkName = this.refs.bookMarkName.value;
                var bookMarkUrl = this.refs.bookMarkUrl.value;
                this.props.dispatch(actions.addBookmark(bookMarkName, bookMarkUrl));
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
                        <input type="text" ref="bookMarkName" placeholder="Name your bookmark"
                               className="input" autofocus/>
                        <input type="text" ref="bookMarkUrl" placeholder="Paste url to bookmark"
                               className="input"/>
                        <TagsContainer tags={this.state.tags} addTag={this.addTag} removeTag={this.removeTag}/>
                        <button onClick={this.addBookmark} className="btn">Add Bookmark</button>
                    </Modal>
                );
            }
        });
    }
);




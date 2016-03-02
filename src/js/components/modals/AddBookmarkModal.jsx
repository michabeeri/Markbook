define(['lodash', 'react', 'actionProviders/actions', 'components/tags/tagsContainer'],
    function (_, React, actions, TagsContainer) {
        'use strict';

        var LinkedStateMixin = React.addons.LinkedStateMixin;

        return React.createClass({
            mixins: [LinkedStateMixin],
            displayName: 'AddBookmarkModal',
            propTypes: {
                closeModal: React.PropTypes.func.isRequired,
                dispatch: React.PropTypes.func.isRequired,
                state: React.PropTypes.object
            },
            getInitialState: function () {
                return {
                    bookmarkName: '',
                    bookmarkUrl: '',
                    tags: []
                };
            },
            addBookmark: function () {
                this.props.dispatch(actions.addBookmark(_.last(this.props.state.currentBookmarkPath), this.state.bookmarkName, this.state.bookmarkUrl, this.state.tags));
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
                return (<div>
                        <h1>Add Bookmark</h1>
                        <input name="BookmarkName" type="text" valueLink={this.linkState('bookmarkName')}
                               placeholder="Name your bookmark"
                               className="input" autofocus/>
                        <input name="BookmarkUrl" type="text" valueLink={this.linkState('bookmarkUrl')}
                               placeholder="Paste url to bookmark"
                               className="input"/>
                        <TagsContainer tags={this.state.tags} addTag={this.addTag} removeTag={this.removeTag}
                                       bookmarks={this.props.state.bookmarks}/>
                        <button onClick={this.addBookmark} className="btn">Add Bookmark</button>
                    </div>

                );
            }
        });
    }
);




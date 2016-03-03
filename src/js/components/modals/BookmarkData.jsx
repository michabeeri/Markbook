define(['lodash', 'react', 'actionProviders/actions', 'components/tags/tagsContainer', 'components/modals/groupInput'],
    function (_, React, actions, TagsContainer, GroupInput) {
        'use strict';

        var LinkedStateMixin = React.addons.LinkedStateMixin;

        return React.createClass({
            mixins: [LinkedStateMixin],
            displayName: 'Bookmark Data',
            propTypes: {
                dispatch: React.PropTypes.func.isRequired,
                state: React.PropTypes.object.isRequired,
                close: React.PropTypes.func.isRequired
            },
            getInitialState: function () {
                return {
                    bookmarkName: '',
                    bookmarkUrl: '',
                    tags: [],
                    group: ''
                };
            },
            addBookmark: function () {
                this.props.dispatch(actions.addBookmark(_.last(this.props.state.currentBookmarkPath), this.state.bookmarkName, this.state.bookmarkUrl, this.state.tags));
                this.props.close();
            },
            addGroup: function (group) {
                this.setState({
                    group: group
                });
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
                        <GroupInput addGroup={this.addGroup} bookmarks={this.props.state.bookmarks}/>
                        <TagsContainer tags={this.state.tags} addTag={this.addTag} removeTag={this.removeTag}
                                       bookmarks={this.props.state.bookmarks}/>
                        <button onClick={this.addBookmark} className="btn">Add Bookmark</button>
                    </div>

                );
            }
        });
    }
);




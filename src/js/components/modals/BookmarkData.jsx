define(['lodash', 'react', 'actionProviders/actions', 'components/tags/tagsContainer', 'utils/bookmarksUtil','components/modals/groupInput'],
    function (_, React, actions, TagsContainer, BookmarksUtil, GroupInput) {
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
            isEditMode: function () {
                var id = this.props.state.modals.id;
                return !(_.isUndefined(id) || _.isNull(id));
            },
            getInitialState: function () {

                var bookmarkName = '',
                    bookmarkUrl = '',
                    tags = [],
                    group = '';

                if (this.isEditMode()) {
                    var bookmark = BookmarksUtil.getBookmarkById(this.props.state.bookmarks, this.props.state.modals.id);
                    bookmarkName = bookmark.title;
                    bookmarkUrl = bookmark.url;
                    bookmark.tags = tags;
                }

                return {
                    bookmarkName: bookmarkName,
                    bookmarkUrl: bookmarkUrl,
                    tags: tags,
                        group: group
                };
            },
            addBookmark: function () {
                this.props.dispatch(actions.addBookmark(_.last(this.props.state.currentBookmarkPath), this.state.bookmarkName, this.state.bookmarkUrl, this.state.tags));
                this.props.close();
            },
            editBookmark: function () {
                this.props.dispatch(actions.editBookmark(this.props.state.modals.id, _.last(this.props.state.currentBookmarkPath), this.state.bookmarkName, this.state.bookmarkUrl, this.state.tags));
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
                var buttonText = (this.isEditMode()) ? 'Edit bookmark' : 'Add Bookmark';
                var onClickCallback = (this.isEditMode()) ? this.editBookmark : this.addBookmark;

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
                        <button onClick={onClickCallback} className="btn">{buttonText}</button>
                    </div>

                );
            }
        });
    }
);




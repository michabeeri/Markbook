define(['lodash', 'react', 'actionProviders/actions', 'components/tags/tagsContainer', 'utils/bookmarksUtil', 'components/modals/groupInput', 'components/loginManager/errorMessage', 'components/modals/bookmarkValidator'],
    function (_, React, actions, TagsContainer, BookmarksUtil, GroupInput, ErrorMessage, BookmarkValidator) {
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
            isBookmarkGroup: function () {
                return BookmarksUtil.isGroup(this.props.state.bookmarks, this.props.state.modals.id);
            },
            getInitialState: function () {
                var bookmarkName = '',
                    bookmarkUrl = '',
                    tags = [];

                var parentGroup = BookmarksUtil.getBookmarkById(this.props.state.bookmarks, _.last(this.props.state.currentBookmarkPath));
                var groupName = parentGroup.title;

                if (this.isEditMode()) {
                    var bookmark = BookmarksUtil.getBookmarkById(this.props.state.bookmarks, this.props.state.modals.id);
                    bookmarkName = bookmark.title;
                    bookmarkUrl = bookmark.url;
                    tags = bookmark.tags;
                }

                return {
                    bookmarkName: bookmarkName,
                    bookmarkUrl: bookmarkUrl,
                    tags: tags,
                    groupName: groupName,
                    errorMessage: ''

                };
            },
            addNewBookmarkToNewGroup: function () {
                this.props.dispatch(actions.addNewBookmarkToNewGroup(_.last(this.props.state.currentBookmarkPath), this.state.groupName, this.state.bookmarkName, this.state.bookmarkUrl, this.state.tags));
            },
            addNewBookmarkToExistingGroup: function () {
                var groupId = this.getGroupId();
                this.props.dispatch(actions.addBookmark(groupId, this.state.bookmarkName, this.state.bookmarkUrl, this.state.tags));
            },
            editBookmarkInExistingGroup: function () {
                var groupId = this.getGroupId();
                this.props.dispatch(actions.editBookmark(
                    this.props.state.modals.id,
                    groupId,
                    this.state.bookmarkName,
                    this.state.bookmarkUrl,
                    this.state.tags));
            },
            editBookmarkAddToNewGroup: function () {
                this.props.dispatch(actions.editBookmarkAndCreateNewGroup(
                    this.props.state.modals.id,
                    _.last(this.props.state.currentBookmarkPath),
                    this.state.groupName,
                    this.state.bookmarkName,
                    this.state.bookmarkUrl,
                    this.state.tags));
            },
            addBookmark: function () {

                if (BookmarkValidator.isValid(this.state.bookmarkName,
                        this.state.bookmarkUrl, this.state.groupName)) {
                    var group = BookmarksUtil.getGroupByTitle(this.props.state.bookmarks, this.state.groupName);

                    if (_.isUndefined(group)) {
                        this.addNewBookmarkToNewGroup();
                    } else {
                        this.addNewBookmarkToExistingGroup();
                    }

                    this.props.close();
                } else {
                    var errorMessage = BookmarkValidator.getErrorMessageOnFail(this.state.bookmarkName,
                        this.state.bookmarkUrl, this.state.groupName);

                    this.setState({
                        errorMessage: errorMessage
                    });
                }
            },
            getGroupId: function () {
                var group = BookmarksUtil.getGroupByTitle(this.props.state.bookmarks, this.state.groupName);
                return (group && group.id) ? group.id : _.last(this.props.state.currentBookmarkPath);
            },
            editBookmark: function () {
                if (BookmarkValidator.isValid(this.state.bookmarkName,
                        this.state.bookmarkUrl, this.state.groupName)) {

                    var group = BookmarksUtil.getGroupByTitle(this.props.state.bookmarks, this.state.groupName);

                    if (_.isUndefined(group)) {
                        this.editBookmarkAddToNewGroup();
                    } else {
                        this.editBookmarkInExistingGroup();
                    }

                    this.props.close();
                } else {
                    var errorMessage = BookmarkValidator.getErrorMessageOnFail(this.state.bookmarkName,
                        this.state.bookmarkUrl, this.state.groupName);

                    this.setState({
                        errorMessage: errorMessage
                    });
                }
            },
            addGroup: function (groupName) {
                this.setState({
                    groupName: groupName
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
                var titleText, buttonText, bookmarkUrlShow, bookmarkUrlContent = '';

                if (this.isEditMode()) {
                    buttonText = 'Save changes';
                    titleText = (this.isBookmarkGroup()) ? 'Edit group' : 'Edit bookmark';
                    bookmarkUrlShow = !this.isBookmarkGroup();
                } else {
                    bookmarkUrlShow = true;
                    buttonText = 'Save';
                    titleText = 'Add new bookmark';
                }

                if (bookmarkUrlShow) {
                    bookmarkUrlContent = <input name="BookmarkUrl" type="url" valueLink={this.linkState('bookmarkUrl')}
                                                placeholder="Paste url to bookmark"
                                                className="input"/>;
                }

                var onClickCallback = (this.isEditMode()) ? this.editBookmark : this.addBookmark;

                return (<div>
                        <h1>{titleText}</h1>
                        <ErrorMessage errorMessage={this.state.errorMessage}/>
                        <input name="BookmarkName" type="text" valueLink={this.linkState('bookmarkName')}
                               placeholder="Name your bookmark"
                               className="input" autofocus/>
                        {bookmarkUrlContent}
                        <GroupInput addGroup={this.addGroup} bookmarks={this.props.state.bookmarks}
                                    input={this.state.groupName}/>
                        <TagsContainer tags={this.state.tags} addTag={this.addTag} removeTag={this.removeTag}
                                       bookmarks={this.props.state.bookmarks}/>
                        <button onClick={onClickCallback} className="btn">{buttonText}</button>
                    </div>

                );
            }
        });
    }
);




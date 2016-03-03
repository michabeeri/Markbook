define(['lodash', 'react', 'actionProviders/actions', 'components/tags/tagsContainer', 'utils/bookmarksUtil'],
    function (_, React, actions, TagsContainer, BookmarksUtil) {
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
                var id = this.props.state.modals.id;
                var bookmarkName = '',
                    bookmarkUrl = '',
                    tags = [];

                if (!(_.isUndefined(id) || _.isNull(id))) {
                    var bookmark = BookmarksUtil.getBookmarkById(this.props.state.bookmarks, id);
                    bookmarkName = bookmark.title;
                    bookmarkUrl = bookmark.url;
                    bookmark.tags = tags;
                }

                return {
                    bookmarkName: bookmarkName,
                    bookmarkUrl: bookmarkUrl,
                    tags: tags
                };
            },
            addBookmark: function () {
                this.props.dispatch(actions.addBookmark(_.last(this.props.state.currentBookmarkPath), this.state.bookmarkName, this.state.bookmarkUrl, this.state.tags));
                this.props.close();
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




define(['React', 'lodash', 'components/tags/tagInput', 'components/tags/tagsList', 'utils/bookmarksUtil'],
    function (React, _, TagInput, TagsList, BookmarksUtil) {
        'use strict';

        var LinkedStateMixin = React.addons.LinkedStateMixin;

        return React.createClass({
            propTypes: {
                tags: React.PropTypes.array.isRequired,
                addTag: React.PropTypes.func.isRequired,
                removeTag: React.PropTypes.func.isRequired,
                bookmarks: React.PropTypes.object.isRequired
            },
            mixins: [LinkedStateMixin],
            getInitialState: function () {
                return {
                    input: ''
                };
            },
            addTag: function (tag) {
                if (this.props.tags.indexOf(tag) === -1) {
                    this.setState({
                        input: ''
                    });
                    this.props.addTag(tag);
                }
            },
            removeTag: function (tag) {
                this.props.removeTag(tag);
            },
            getFilteredUserTags: function () {
                var filteredItems = BookmarksUtil.filterItems(this.props.bookmarks, this.state.input, ['tags']).tags;

                _.pull(filteredItems, function (tag) {
                    return this.props.tags.indexOf(tag) !== -1;
                });
                return filteredItems;
            },
            render: function () {
                return (
                    <div>
                        <TagInput addTag={this.addTag}
                                  suggestedTags={this.getFilteredUserTags()}
                                  valueLink={this.linkState('input')}/>
                        <TagsList tags={this.props.tags} removeTag={this.removeTag}/>
                    </div>
                );
            }
        });
    });

define(['React', 'lodash', 'components/tags/inputWithSuggestions', 'components/tags/tagsList', 'utils/bookmarksUtil'],
    function (React, _, InputWithSuggestions, TagsList, BookmarksUtil) {
        'use strict';

        var LinkedStateMixin = React.addons.LinkedStateMixin;

        return React.createClass({
            propTypes: {
                tags: React.PropTypes.array.isRequired,
                addTag: React.PropTypes.func.isRequired,
                removeTag: React.PropTypes.func.isRequired,
                bookmarks: React.PropTypes.array.isRequired
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
            removeExistingTagsFromSuggestions: function (filteredItems) {
                var self = this;
                _.remove(filteredItems, function (tag) {
                    return self.props.tags.indexOf(tag) !== -1;
                });
            },
            getFilteredUserTags: function (filter) {
                var filteredItems = BookmarksUtil.filterItems(this.props.bookmarks, filter, ['tags']).tags;
                this.removeExistingTagsFromSuggestions(filteredItems);
                return this.mapDataForDropdown(filter, filteredItems);
            },
            isNewTag: function (filteredUserTags, filter) {
                return filteredUserTags.indexOf(filter) === -1 && this.props.tags.indexOf(filter) === -1;
            }, mapDataForDropdown: function (filter, filteredUserTags) {
                var data = {
                    input: filter,
                    items: [{title: 'Suggestions', groupType: 'tag', lines: filteredUserTags}]
                };
                if (this.isNewTag(filteredUserTags, filter)) {
                    data.items.push({title: 'New tag', groupType: 'tag', lines: [filter]});
                }
                return data;
            },
            render: function () {
                return (
                    <div>
                        <span className="label">Add tag:</span>
                        <InputWithSuggestions onInputSelected={this.addTag}
                                  input={this.state.input}
                                  suggestions={this.getFilteredUserTags(this.state.input)}
                                  valueLink={this.linkState('input')}/>
                        <TagsList tags={this.props.tags} removeTag={this.removeTag}/>
                    </div>
                );
            }
        });
    });

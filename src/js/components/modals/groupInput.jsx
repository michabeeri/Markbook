define(['react', 'components/tags/inputWithSuggestions', 'utils/bookmarksUtil'],
    function (React, InputWithSuggestions, BookmarksUtil) {
        'use strict';

        var LinkedStateMixin = React.addons.LinkedStateMixin;

        return React.createClass({
            propTypes: {
                input: React.PropTypes.string.isRequired,
                addGroup: React.PropTypes.func.isRequired,
                bookmarks: React.PropTypes.array.isRequired
            },
            mixins: [LinkedStateMixin],
            getInitialState: function () {
                return {
                    input: this.props.input
                };
            },
            onInputSelected: function (group) {
                this.setState({
                    input: group
                });
                this.props.addGroup(group);
            },
            getFilteredGroups: function (filter) {
                var groups = BookmarksUtil.getAllGroups(this.props.bookmarks);
                var filteredGroups = BookmarksUtil.filterItems(groups, filter, ['title']).title;
                return this.mapDataForDropdown(filter, filteredGroups);
            },
            mapDataForDropdown: function (filter, filteredGroups) {
                var data = {
                    input: filter,
                    items: [{title: 'Suggestions', groupType: '', lines: filteredGroups}]
                };
                if (filteredGroups.indexOf(filter) === -1) {
                    data.items.push({title: 'New Group', groupType: '', lines: [filter]});
                }
                return data;
            },
            render: function () {
                return (
                    <InputWithSuggestions onInputSelected={this.onInputSelected}
                                          valueLink={this.linkState('input')}
                                          suggestions={this.getFilteredGroups(this.state.input)}/>
                );
            }
        });
    });


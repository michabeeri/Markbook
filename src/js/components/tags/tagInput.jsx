define(['React', 'lodash', 'components/dropdown/dropdown'],
    function (React, _, DropDown) {
    'use strict';

    var LinkedStateMixin = React.addons.LinkedStateMixin;

    return React.createClass({
        propTypes: {
            addTag: React.PropTypes.func.isRequired,
            userTags: React.PropTypes.array.isRequired
        },
        mixins: [LinkedStateMixin],
        getInitialState: function () {
            return {
                input: ''
            };
        },
        addTag: function (tag) {
            this.props.addTag(tag);
            this.setState({
                input: ''
            });
        },
        onKeyDown: function (event) {
            if (!_.isEmpty(event.target.value)) {
                if (event.keyCode === 13 || event.keyCode === 188) {
                    event.preventDefault();
                    this.addTag(this.state.input);
                }
            }
        },
        filterTags: function (filter, tags) {
            return _.filter(tags, function (tag) {
                return tag.substring(0, filter.length) === filter;
            });
        },
        getDataForDropdown: function (filter, tags) {
            var filteredTags = this.filterTags(filter, tags);
            var items = [{title: 'Tags', groupType: 'tag', lines: filteredTags}];
            if (filteredTags.indexOf(filter) === -1) {
                items.push({title: 'New tag', groupType: 'tag', lines: [filter]});
            }
            return {
                input: filter,
                items: items
            };
        },
        onLineClick: function (group, tag) {
            this.addTag(tag);
        },
        render: function () {
            var dropdown = null;
            if (!_.isEmpty(this.state.input)) {
                dropdown = <DropDown ref="dropdown"
                                     data={this.getDataForDropdown(this.state.input, this.props.userTags)}
                                     onLineClick={this.onLineClick}/>;
            }
            return (
                <div>
                    <span>Add tag:</span>
                    <input type="text" onKeyDown={this.onKeyDown} ref="input" valueLink={this.linkState('input')}/>
                    {dropdown}
                </div>
            );
        }
    });
});

define(['React', 'lodash', 'components/dropdown/dropdown'],
    function (React, _, DropDown) {
    'use strict';

    var LinkedStateMixin = React.addons.LinkedStateMixin;

    return React.createClass({
        propTypes: {
            addTag: React.PropTypes.func.isRequired
        },
        mixins: [LinkedStateMixin],
        getInitialState: function () {
            return {
                input: ''
            };
        },
        onKeyDown: function (event) {
            if (!_.isEmpty(event.target.value)) {
                if (event.keyCode === 13 || event.keyCode === 188) {
                    event.preventDefault();
                    this.props.addTag(this.state.input);
                    this.setState({
                        input: ''
                    });
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
        render: function () {
            var dropdown = null;
            if (!_.isEmpty(this.state.input)) {
                dropdown = <DropDown ref="dropdown"
                                     data={this.getDataForDropdown(this.state.input, this.props.tags)}
                                     onLineClick={this.props.addTag}/>;
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

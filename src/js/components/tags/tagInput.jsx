define(['React', 'lodash', 'components/dropdown/dropdown'],
    function (React, _, DropDown) {
    'use strict';

    return React.createClass({
        propTypes: {
            addTag: React.PropTypes.func.isRequired,
            valueLink: React.PropTypes.func.isRequired,
            suggestedTags: React.PropTypes.array.isRequired
        },
        onKeyDown: function (event) {
            var tag = event.target.value;
            if (!_.isEmpty(tag)) {
                if (event.keyCode === 13) {
                    event.preventDefault();
                    this.props.addTag(tag);
                }
            }
        },
        mapDataForDropdown: function (filter, filteredUserTags) {
            var data = {
                input: filter,
                items: [{title: 'Tags', groupType: 'tag', lines: filteredUserTags}]
            };
            if (filteredUserTags.indexOf(filter) === -1) {
                data.items.push({title: 'New tag', groupType: 'tag', lines: [filter]});
            }
            return data;
        },
        onLineClick: function (group, tag) {
            this.props.addTag(tag);
        },
        render: function () {
            var dropdown = null;
            if (!_.isEmpty(this.refs.input)) {
                dropdown = <DropDown ref="dropdown"
                                     data={this.mapDataForDropdown(this.props.input, this.props.suggestedTags)}
                                     onLineClick={this.onLineClick}/>;
            }
            return (
                <div>
                    <span>Add tag:</span>
                    <input type="text" onKeyDown={this.onKeyDown} ref="input" valueLink={this.props.valueLink}/>
                    {dropdown}
                </div>
            );
        }
    });
});

define(['react'], function (React) {

    'use strict';

    return React.createClass({
        displayName: 'Dropdown',
        propTypes: {
            data: React.PropTypes.object.isRequired,
            onLineClick: React.PropTypes.func.isRequired
        },
        onClick: function (event) {
            var line = event.target;
            this.props.onLineClick(line.dataset.type, line.dataset.value);
        },
        renderGroup: function () {
            var self = this;
            return this.props.data.items.map(function (filteredGroup, groupIndex) {
                return (
                    <li><span>{filteredGroup.title}</span>
                        <ul className='style-less-list' ref={'group' + groupIndex}>
                            {self.renderGroupLines(filteredGroup)}
                        </ul>
                    </li>);
            });
        },
        renderGroupLines: function (filteredGroup) {
            var self = this;
            if (filteredGroup.lines.length > 0) {
                return (filteredGroup.lines.map(function (line, itemIndex) {
                    return (<li className='btn btn-list-item' onClick={self.onClick}
                                data-value={line}
                                data-type={filteredGroup.groupType}
                                ref={filteredGroup.groupType + itemIndex}>
                        {line}
                    </li>);
                }));
            }
            return <li ref={filteredGroup.groupType + 0}>{'No Matches'}</li>;
        },
        render: function () {
            return (
                <ul className='dropdown-container style-less-list' ref="dropdownList">{this.renderGroup()}</ul>
            );
        }
    });
});



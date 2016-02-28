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
        renderItems: function () {
            var self = this;
            return this.props.data.items.map(function (filteredGroup, groupIndex) {
                return (
                    <li><span>{filteredGroup.title}</span>
                        <ul ref={'group' + groupIndex}>
                            {filteredGroup.lines.map(function (line, itemIndex) {
                                return <li onClick={self.onClick}
                                           data-value={line}
                                           data-type={filteredGroup.groupType}
                                           ref={filteredGroup.groupType + itemIndex}>
                                    {line}
                                </li>;
                            })}
                        </ul>
                    </li>);
            });
        },
        render: function () {
            return (
                <ul ref="dropdownList">{this.renderItems()}</ul>
            );
        }
    });
});



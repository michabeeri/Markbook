define(['react'], function (React) {

    'use strict';

    return React.createClass({
        displayName: 'Dropdown',
        propTypes: {
            data: React.PropTypes.object.isRequired,
            onLineClick: React.PropTypes.func.isRequired,
            selected: React.PropTypes.number
        },
        getInitialState: function () {
            this.counter = 0;
            return {};
        },
        onClick: function (event) {
            var line = event.target;
            this.props.onLineClick(line.dataset.type, line.dataset.value);
        },
        onMouseOver: function (event) {
            event.preventDefault();
            this.props.setSelected(Number(event.target.dataset.id));
        },
        renderGroup: function () {
            var self = this;
            return this.props.data.items.map(function (filteredGroup, groupIndex) {
                var title = (filteredGroup.title) ?
                    <span className="dropdown-items-title">{filteredGroup.title}</span> : '';
                return (
                    <li key={Math.random()} className="dropdown-group">{title}
                        <ul className='style-less-list' ref={'group' + groupIndex}>
                            {self.renderGroupLines(filteredGroup)}
                        </ul>
                    </li>);
            });
        },
        componentWillReceiveProps: function () {
            this.counter = 0;
        },
        renderGroupLines: function (filteredGroup) {
            var self = this;
            if (filteredGroup.lines.length > 0) {
                return (filteredGroup.lines.map(function (line, itemIndex) {
                    var id = self.counter++;
                    var selectedClass = (id === self.props.selected) ? ' selected' : '';
                    return (<li className={'btn-list-item dropdown-item' + selectedClass} onMouseDown={self.onClick}
                                onMouseEnter={self.onMouseOver}
                                data-value={line} key={Math.random()} data-id={id}
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
                <ul className='style-less-list dropdown-container' ref="dropdownList">{this.renderGroup()}</ul>
            );
        }
    });
});




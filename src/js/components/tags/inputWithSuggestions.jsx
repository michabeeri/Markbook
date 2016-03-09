define(['React', 'lodash', 'components/dropdown/dropdown'],
    function (React, _, DropDown) {
        'use strict';

        return React.createClass({
            displayName: 'InputWithSuggestions',
            propTypes: {
                onInputSelected: React.PropTypes.func.isRequired,
                valueLink: React.PropTypes.object.isRequired,
                suggestions: React.PropTypes.object.isRequired,
                placeholder: React.PropTypes.string
            },
            getInitialState: function () {
                return {
                    isEditing: false,
                    selectedDropdownItemIndex: 0
                };
            },
            onInputSelected: function (group, input) {
                this.setState({
                    isEditing: false,
                    selectedDropdownItemIndex: 0
                });
                this.props.onInputSelected(input, group);
            },
            getSelectedItem: function () {
                var index = this.state.selectedDropdownItemIndex;
                var totalItems = 0;
                var obj = null;
                for (var i = 0; i < this.props.suggestions.items.length; i++) {
                    var group = this.props.suggestions.items[i];
                    totalItems += group.lines.length;
                    if (index < totalItems) {
                        obj = {
                            type: group.groupType,
                            title: group.lines[index % group.lines.length]
                        };
                        break;
                    }
                }
                return obj;
            }, onKeyUp: function (event) {
                var text = event.target.value;
                if (_.isEmpty(text)) {
                    this.setState({
                        isEditing: false,
                        selectedDropdownItemIndex: 0
                    });
                } else if (event.keyCode === 13) {
                    var item = this.getSelectedItem();
                    if (item !== null) {
                        this.onInputSelected(item.type, item.title);
                    }
                } else if (event.keyCode === 40) {
                    this.setNextSelected();
                } else if (event.keyCode === 38) {
                    this.setPrevSelected();
                } else {
                    this.setState({
                        isEditing: true
                    });
                }
            },
            onBlur: function () {
                this.setState({
                    isEditing: false,
                    selectedDropdownItemIndex: 0
                });
            },
            onFocus: function () {
                if (!_.isEmpty(this.refs.input.value)) {
                    this.setState({
                        isEditing: true
                    });
                }
            },
            setNextSelected: function () {
                var maxIndex = _.sum(this.props.suggestions.items, function (item) {
                    return item.lines.length;
                });
                if (this.state.selectedDropdownItemIndex < maxIndex - 1) {
                    var nextItemIndex = this.state.selectedDropdownItemIndex + 1;
                    this.setSelected(nextItemIndex);
                }
            },
            setPrevSelected: function () {
                if (this.state.selectedDropdownItemIndex > 0) {
                    var nextItemIndex = this.state.selectedDropdownItemIndex - 1;
                    this.setSelected(nextItemIndex);
                }
            },
            setSelected: function (selectedIndex) {
                this.setState({
                    selectedDropdownItemIndex: selectedIndex
                });
            },
            render: function () {
                return (
                    <span className="input-wrapper">
                        <input className="input input-with-label" type="text" onKeyUp={this.onKeyUp} ref="input" onFocus={this.onFocus}
                               valueLink={this.props.valueLink} onBlur={this.onBlur}
                               placeholder={this.props.placeholder}/>
                        {this.state.isEditing && this.props.valueLink.value ?
                            <DropDown ref="dropdown" data={this.props.suggestions}
                                      selected={this.state.selectedDropdownItemIndex}
                                      setSelected={this.setSelected}
                                      onLineClick={this.onInputSelected}/> :
                            null
                        }
                    </span>
                );
            }
        });
    });

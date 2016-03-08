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
                    isEditing: false
                };
            },
            onInputSelected: function (group, input) {
                this.setState({
                    isEditing: false
                });
                this.props.onInputSelected(input, group);
            },
            onKeyUp: function (event) {
                var text = event.target.value;
                if (_.isEmpty(text)) {
                    this.setState({
                        isEditing: false
                    });
                } else if (event.keyCode === 13) {
                    this.onInputSelected(text);
                } else {
                    this.setState({
                        isEditing: true
                    });
                }
            },
            onBlur: function () {
                this.setState({
                    isEditing: false
                });
            },
            render: function () {
                return (
                    <span className="input-wrapper">
                        <input className="input" type="text" onKeyUp={this.onKeyUp} ref="input"
                               valueLink={this.props.valueLink} onBlur={this.onBlur} placeholder={this.props.placeholder}/>
                        {this.state.isEditing && this.props.valueLink.value ?
                            <DropDown ref="dropdown" data={this.props.suggestions}
                                      onLineClick={this.onInputSelected}/> :
                            null
                        }
                    </span>
                );
            }
        });
    });

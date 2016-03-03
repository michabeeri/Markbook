define(['React', 'lodash', 'components/dropdown/dropdown'],
    function (React, _, DropDown) {
        'use strict';

        return React.createClass({
            propTypes: {
                onInputSelected: React.PropTypes.func.isRequired,
                valueLink: React.PropTypes.object.isRequired,
                suggestions: React.PropTypes.object.isRequired
            },
            getInitialState: function () {
                return {
                    isEditing: false
                };
            },
            onInputSelected: function (input) {
                this.setState({
                    isEditing: false
                });
                this.props.onInputSelected(input);
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
                //this.setState({
                //    isEditing: false
                //});
            },
            onSuggestionClick: function (group, suggestion) {
                this.onInputSelected(suggestion);
            },
            render: function () {
                return (
                    <span className="input-wrapper">
                        <input className="input" type="text" onKeyUp={this.onKeyUp} ref="input"
                               valueLink={this.props.valueLink} onBlur={this.onBlur}/>
                        {this.state.isEditing && this.props.valueLink.value ?
                            <DropDown ref="dropdown" data={this.props.suggestions}
                                      onLineClick={this.onSuggestionClick}/> :
                            null
                        }
                    </span>
                );
            }
        });
    });
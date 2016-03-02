define(['React', 'lodash', 'components/dropdown/dropdown'],
    function (React, _, DropDown) {
        'use strict';

        return React.createClass({
            propTypes: {
                input: React.PropTypes.string.isRequired,
                onInputSelected: React.PropTypes.func.isRequired,
                valueLink: React.PropTypes.object.isRequired,
                suggestions: React.PropTypes.object.isRequired
            },
            onKeyDown: function (event) {
                var text = event.target.value;
                if (!_.isEmpty(text)) {
                    if (event.keyCode === 13) {
                        event.preventDefault();
                        this.props.onInputSelected(text);
                    }
                }
            },
            onSuggestionClick: function (group, tag) {
                this.props.onInputSelected(tag);
            },
            render: function () {
                return (
                    <span className="input-wrapper">
                        <input className="input" type="text" onKeyDown={this.onKeyDown} ref="input"
                               valueLink={this.props.valueLink}/>
                        {!_.isEmpty(this.props.input) ?
                            <DropDown ref="dropdown" data={this.props.suggestions}
                                      onLineClick={this.onSuggestionClick}/> :
                            null
                        }
                    </span>
                );
            }
        });
    });

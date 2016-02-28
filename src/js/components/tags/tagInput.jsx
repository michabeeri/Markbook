define(['React'], function (React) {
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
            if (event.keyCode === 13 || event.keyCode === 188) {
                event.preventDefault();
                this.props.addTag(this.state.input);
                this.setState({
                    input: ''
                });
            }
        },
        render: function () {
            return (
                <span>
                    <span>Add tag:</span>
                    <input type="text" onKeyDown={this.onKeyDown} ref="input" valueLink={this.linkState('input')}/>
                </span>
            );
        }
    });
});

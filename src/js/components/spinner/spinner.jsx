define(['react', 'spin'], function (React, Spinner) {
    'use strict';

    return React.createClass({
        displayName: 'Spinner',
        propTypes: {
            config: React.PropTypes.object,
            stopped: React.PropTypes.bool
        },
        componentDidMount: function () {
            this.spinner = new Spinner(this.props.config);
            if (!this.props.stopped) {
                this.spinner.spin(this.refs.container);
            }
        },

        componentWillReceiveProps: function (newProps) {
            if (newProps.stopped === true && !this.props.stopped) {
                this.spinner.stop();
            } else if (!newProps.stopped && this.props.stopped === true) {
                this.spinner.spin(this.refs.container);
            }
        },

        componentWillUnmount: function () {
            this.spinner.stop();
        },

        render: function () {
            return (
                <span ref="container" className="spinner"/>
            );
        }
    });
});

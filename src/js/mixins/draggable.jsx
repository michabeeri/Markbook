define([], function () {
    'use strict';
    return {
        getInitialState: function () {
            return {
                dragged: false
            };
        },
        onDragStart: function () {
            this.setState({
                dragged: true
            });
        },
        onDragEnd: function () {
            this.setState({
                dragged: false
            });
        }
    };
});

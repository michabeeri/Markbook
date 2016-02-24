define([], function () {
    'use strict';
    return {
        getInitialState: function () {
            return {
                dragged: false
            };
        },
        onDragStart: function (event) {
            this.setState({
                dragged: true
            });
        }
    };
});

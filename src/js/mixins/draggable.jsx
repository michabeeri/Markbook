define([], function () {
    'use strict';
    return {
        onDragStart: function (event) {
            event.dataTransfer.effectAllowed = 'move';
            setTimeout(function () {
                this.props.dragStart(this.props.dataId);
            }.bind(this), 50);
        },
        onDragOver: function (event) {
            event.preventDefault();
            this.props.dragOver(this.props.dataId);
        },
        onDragEnd: function () {
            this.props.dragEnd();
        }
    };
});

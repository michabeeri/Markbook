define([], function () {
    'use strict';
    return {
        onDragStart: function (event) {
            event.stopPropagation();
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setDragImage(this.refs.draggedItem, 0, 0);
            setTimeout(function () {
                this.props.dragStart(this.props.dataId);
            }.bind(this), 50);
        },
        onDragOver: function (event) {
            event.preventDefault(); //allows drop at this location
            this.props.dragOver(this.props.dataId);
        },
        onDragEnd: function () {
            this.props.dragEnd();
        },
        getDragAttr: function () {
            return {
                onDragStart: this.onDragStart,
                onDragEnd: this.onDragEnd,
                onDragOver: this.onDragOver,
                ref: 'draggedItem'
            };
        }
    };
});

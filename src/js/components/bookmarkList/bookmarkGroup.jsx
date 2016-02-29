define(['react', 'mixins/draggable'], function (React, draggable) {
    'use strict';
    return React.createClass({
        mixins: [draggable],
        displayName: 'BookmarkGroup',
        render: function () {
            var classString = 'bookmark-base grid' + (this.props.bookmarkData.selected ? ' selected' : '') +
                (this.props.dragClass ? 'dragged' : '');
            return (
                <div className={classString}
                     draggable='true' onDragStart={this.onDragStart} onDragEnd={this.onDragEnd} onDragOver={this.onDragOver}
                     onClick={this.props.onClick} onDoubleClick={this.props.onDoubleClick} data-id={this.props.dataId}>
                    <h1 className='title-small'>{this.props.bookmarkData.title}</h1>
                    <h2 className='title-small footer'>{this.props.bookmarkData.children.length + ' items inside'}</h2>
                    <button onClick={this.props.onOpen}>{'Open'}</button>
                    <button onClick={this.props.onEdit}>{'Edit'}</button>
                    <button onClick={this.props.onDelete}>{'Delete'}</button>
                </div>
            );
        }
    });
});

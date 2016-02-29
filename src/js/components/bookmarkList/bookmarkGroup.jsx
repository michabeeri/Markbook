define(['react'], function (React) {
    'use strict';
    return React.createClass({
        displayName: 'BookmarkGroup',
        render: function () {
            var classString = 'bookmark-base grid' + (this.props.bookmarkData.selected ? ' selected' : '');
            return (
                <div className={classString} onClick={this.props.onClick} onDoubleClick={this.props.onDoubleClick}>
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

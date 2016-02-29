define(['react'], function (React) {
    'use strict';
    return React.createClass({
        displayName: 'BookmarkGroup',
        render: function () {
            return (
                <div className="bookmark-base">
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

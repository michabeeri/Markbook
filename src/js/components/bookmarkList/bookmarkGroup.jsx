define(['react'], function (React) {
    'use strict';
    return React.createClass({
        displayName: 'BookmarkGroup',
        render: function () {
            return (
                <div className="bookmark-base">
                    <h1>{this.props.bookmarkData.title}</h1>
                    <h2>{this.props.bookmarkData.children.length + ' items inside'}</h2>
                    <button onClick={this.props.onOpen}>{'Open'}</button>
                    <button onClick={this.props.onEdit}>{'Edit'}</button>
                    <button onClick={this.props.onDelete}>{'Delete'}</button>
                </div>
            );
        }
    });
});

define(['react'], function (React) {
    'use strict';
    return React.createClass({
        displayName: 'Bookmark',
        render: function () {
            return (
                <div className="bookmark-base">
                    <h1>{this.props.bookmarkData.title}</h1>
                    <h2>{this.props.bookmarkData.date.toLocaleDateString('en-US')}</h2>
                    <button onClick={this.props.onView}>{'View'}</button>
                    <button onClick={this.props.onEdit}>{'Edit'}</button>
                    <button onClick={this.props.onDelete}>{'Delete'}</button>
                </div>
            );
        }
    });
});

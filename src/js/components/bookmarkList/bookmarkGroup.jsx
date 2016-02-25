define(['react'], function (React) {
    'use strict';
    return React.createClass({
        displayName: 'BookmarkGroup',
        render: function () {
            return (
                <div className="bookmark-base">
                    <h1>{this.props.itemData.title}</h1>
                    <h2>{this.props.itemData.children.length + ' items inside'}</h2>
                </div>
            );
        }
    });
});

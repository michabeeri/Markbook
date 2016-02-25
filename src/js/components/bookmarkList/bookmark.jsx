define(['react'], function (React) {
    'use strict';
    return React.createClass({
        displayName: 'Bookmark',
        render: function () {
            return (
                <div className="bookmark-base">
                    <h1>{this.props.itemData.title}</h1>
                    <h2>{this.props.itemData.date.toLocaleDateString('en-US')}</h2>
                </div>
            );
        }
    });
});

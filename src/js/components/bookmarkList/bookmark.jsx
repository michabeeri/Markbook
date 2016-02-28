define(['react'], function (React) {
    'use strict';
    return React.createClass({
        displayName: 'Bookmark',
        render: function () {
            return (
                <div className="bookmark-base">
                    <h1 className='title-small'>{this.props.bookmarkData.title}</h1>
                    <h2 className='title-small date'>{this.props.bookmarkData.date.toLocaleDateString('en-US')}</h2>
                </div>
            );
        }
    });
});

define(['react'], function (React) {
    'use strict';

    return React.createClass({
        render: function () {
            return (
                <div className = 'empty-state-container fixed-center'>
                    <h1 className = 'empty-state-container-title'>Welcome</h1>
                    <img src='img/bookmark.png' alt='bookmark' width='200' height='200'/>
                    <p>Add your first bookmark</p>
                </div>
            );
        }

    });
});

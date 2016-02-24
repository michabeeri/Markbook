define(['react'], function (React) {
    'use strict';
    return React.createClass({
        displayName: 'AppView',
        getInitialState: function () {
            return {
                items: []
            };
        },
        addItem: function () {
            return false;
        },
        render: function () {
            return (
                <div>MainApp</div>
            );
        }
    });
});

define(['react', 'components/mainView/topbar'], function (React, TopBar) {
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
                <div className='main'>
                    <TopBar username='user@wix.com'/>
                </div>
            );
        }
    });
});

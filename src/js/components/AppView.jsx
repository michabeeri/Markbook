define(['react', 'components/mainView/topbar'], function (React, TopBar) {
    'use strict';
    return React.createClass({
        displayName: 'AppView',
        getInitialState: function () {
            return {
                items: [],
                username: 'user@wix.com'
            };
        },
        addItem: function () {
            return false;
        },
        render: function () {
            return (
                <div className='main'>
                    <TopBar username={this.state.username}/>
                </div>
            );
        }
    });
});

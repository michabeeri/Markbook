
define(['react', 'components/mainView/mainView', 'components/mainView/topbar'], function (React, MainView, TopBar) {

    'use strict';
    return React.createClass({
        displayName: 'AppView',
        getInitialState: function () {
            return {
                items: this.props.items,
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
                    <MainView items={this.state.items}/>
                </div>
            );
        }
    });
});

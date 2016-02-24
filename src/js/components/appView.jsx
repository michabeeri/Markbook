define(['react', 'components/mainView/mainView'], function (React, MainView) {
    'use strict';
    return React.createClass({
        displayName: 'AppView',
        getInitialState: function () {
            return {
                items: this.props.items
            };
        },
        addItem: function () {
            return false;
        },
        render: function () {
            return (
                <MainView items={this.state.items}/>
            );
        }
    });
});

define(['react', 'components/mainView/mainView', 'components/mainView/topbar', 'components/modals/AddBookmarkModal'],
    function (React, MainView, TopBar, AddBookmarkModal) {

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
                        <AddBookmarkModal/>
                    </div>
                );
            }
        });
    });

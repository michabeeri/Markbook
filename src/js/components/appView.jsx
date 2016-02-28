define(['react', 'components/mainView/mainView', 'components/mainView/topbar-rdx'],
    function (React, MainView, TopBar) {

        'use strict';
        return React.createClass({
            displayName: 'AppView',
            render: function () {
                return (
                    <div className='main'>
                        <TopBar username={this.props.username}/>
                        <MainView bookmarks={this.props.bookmarks}/>
                    </div>
                );
            }
        });
    });

define(['react', 'components/mainView/mainView', 'components/mainView/topbar-rdx', 'components/modals/AddBookmarkModal'],
    function (React, MainView, TopBar, AddBookmarkModal) {

        'use strict';
        return React.createClass({
            displayName: 'AppView',
            render: function () {
                return (
                    <div className='main'>
                        <TopBar/>
                        <MainView/>
                        <AddBookmarkModal/>
                    </div>
                );
            }
        });
    });

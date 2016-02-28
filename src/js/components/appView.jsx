
define(['react', 'components/mainView/mainView', 'components/mainView/topbar'],
    function (React, MainView, TopBar) {

        'use strict';
        return React.createClass({
            displayName: 'AppView',
            render: function () {
                return (
                    <div className='main'>
                        <TopBar/>
                        <MainView/>
                    </div>
                );
            }
        });
    });

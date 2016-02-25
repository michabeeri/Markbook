define(['react', 'constants'],
    function (React, Constants) {
        'use strict';

        return React.createClass({
            displayName: 'TopBar',
            componentWillMount: function () {
                if (!this.props.username) {
                    throw new Error('Failed to create the top bar because the username is missing.');
                }
            },
            render: function () {
                return (
                    <header className='top-bar'>
                        <div className='logo-section'>
                            <img className='top-bar-logo' src='img/logo.jpg' alt='app logo' width='40' height='40'/>
                            <span className='top-bar-name'>{Constants.APP_NAME}</span>
                        </div>
                        <div className='logout-section'>
                            <span className='top-bar-username'>{this.props.username}</span>
                            <span className='logout-btn'>Log out</span>
                        </div>
                    </header>
                );
            }
        });

    });

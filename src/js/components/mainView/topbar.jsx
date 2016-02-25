define(['react', 'constants'],
    function (React, Constants) {
        'use strict';

        return React.createClass({
            displayName: 'TopBar',
            componentWillMount: function () {
                this.username = this.props.username;
                if (!this.username) {
                    this.username = '';
                }
            },
            onClick: function () {
                this.props.onLogout();
            },
            render: function () {
                return (
                    <header className='top-bar'>
                        <div className='logo-section'>
                            <img className='top-bar-logo' src='img/logo.jpg' alt='app logo' width='40' height='40'/>
                            <span className='top-bar-name'>{Constants.APP_NAME}</span>
                        </div>
                        <div className='logout-section'>
                            <span className='top-bar-username'>{this.username}</span>
                            <span className='logout-btn' onClick={this.onClick}>Log out</span>
                        </div>
                    </header>
                );
            }
        });

    });

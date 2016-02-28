define(['react', 'constants'],
    function (React, Constants) {
        'use strict';

        return React.createClass({
            displayName: 'TopBar',
            onLogout: function () {
                this.props.dispatch({type: 'LOGOUT'});
            },
            render: function () {
                return (
                    <header className='top-bar'>
                        <div className='logo-section'>
                            <img className='top-bar-logo' src='img/logo.jpg' alt='app logo' width='40' height='40'/>
                            <span className='top-bar-name'>{Constants.APP_NAME}</span>
                        </div>
                        <div className='logout-section'>
                            <span className='top-bar-username'>{this.props.state.username || ''}</span>
                            <span className='logout-btn' onClick={this.onLogout}>Log out</span>
                        </div>
                    </header>
                );
            }
        });
    });

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
                        <div className='top-bar-section'>
                            <img className='logo logo-img' src='img/logo.jpg' alt='app logo' width='40' height='40'/>
                            <span className='logo logo-name'>{Constants.APP_NAME}</span>
                        </div>
                        <div className='btn-group top-bar-section'>
                            <span className='top-bar-username'>{this.props.username || ''}</span>
                            <span className='btn btn-logout' onClick={this.props.onLogout}>Log out</span>
                        </div>
                    </header>
                );
            }
        });

    });

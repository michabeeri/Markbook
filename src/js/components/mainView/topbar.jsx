define(['react', 'constants', 'actionProviders/actions'],
    function (React, Constants, ActionProvider) {
        'use strict';

        return React.createClass({
            displayName: 'TopBar',
            propTypes: {
                state: React.PropTypes.object.isRequired,
                dispatch: React.PropTypes.func.isRequired
            },
            onLogout: function () {
                this.props.dispatch(ActionProvider.logout());
            },
            render: function () {
                return (
                    <header className='top-bar border-bottom'>
                        <div className='top-bar-section'>
                            <img className='logo logo-img' src='img/logo.jpg' alt='app logo' width='40' height='40'/>
                            <span className='logo logo-name'>{Constants.APP_NAME}</span>
                        </div>
                        <div className='btn-group top-bar-section'>
                            <span className='top-bar-username'>{this.props.state.userInfo.username || ''}</span>
                            <span className='btn btn-logout' onClick={this.onLogout}>Log out</span>
                        </div>
                    </header>
                );
            }
        });

    });

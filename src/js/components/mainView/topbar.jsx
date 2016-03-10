define(['react', 'constants', 'actionProviders/actions', 'components/loginManager/loginManager', 'ReduxSimpleRouter'],
    function (React, Constants, ActionProvider, LoginManager, ReduxSimpleRouter) {
        'use strict';

        return React.createClass({
            displayName: 'TopBar',
            propTypes: {
                state: React.PropTypes.object.isRequired,
                dispatch: React.PropTypes.func.isRequired
            },
            onLogout: function () {
                LoginManager.logout();
                this.props.dispatch(ActionProvider.logout());
                this.props.dispatch(ReduxSimpleRouter.routeActions.push('/login'));
            },
            goBack: function () {
                this.props.dispatch(ActionProvider.navigateToPreviousGroup(Constants.ROOT_GROUP_ID));
            },
            render: function () {
                return (
                    <header className='header top-bar border-bottom'>
                        <div className='top-bar-section'>
                            <img className='logo logo-img' onClick={this.goBack} src={Constants.APP_LOGO_SRC} alt='app logo' width='60' height='60'/>
                            <span className='logo logo-name'>{Constants.APP_NAME}</span>
                        </div>
                        <div className='btn-group top-bar-section'>
                            <span className='top-bar-username'>{this.props.state.userInfo.username || ''}</span>
                            <i className='fa fa-sign-out btn-logout' onClick={this.onLogout}></i>
                        </div>
                    </header>
                );
            }
        });

    });

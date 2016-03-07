define(['react', 'reactRedux', 'constants', 'components/mainView/mainView', 'components/mainView/topbar', 'actionProviders/actions', 'components/loginManager/loginManager'],
    function (React, ReactRedux, Constants, MainView, TopBar, ActionProvider, LoginManager) {


        'use strict';
        var AppView = React.createClass({
            displayName: 'AppView',
            componentDidMount: function () {
                var user = LoginManager.getLoggedInUserInfo();
                this.props.dispatch(ActionProvider.login(user.password.email, user.uid, user.token));
                this.props.dispatch(ActionProvider.loadData());
            },
            render: function () {
                return (
                    <div className='main'>
                        <TopBar {...this.props}/>
                        <MainView {...this.props}/>
                    </div>
                );
            }
        });

        return ReactRedux.connect(
            function (state) {
                return {
                    state: state
                };
            },
            function (dispatch) {
                return {
                    dispatch: dispatch
                };
            }
        )(AppView);
    });

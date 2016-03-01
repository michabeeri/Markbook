define(['react', 'reactRedux', 'components/mainView/mainView', 'components/mainView/topbar', 'components/loginManager/login', 'components/loginManager/signup'],
    function (React, ReactRedux, MainView, TopBar, LoginComp, SignupComp) {


        'use strict';
        var AppView = React.createClass({
            displayName: 'AppView',
            render: function () {
                return (
                    <div className='main border-simple'>
                        <TopBar {...this.props}/>
                        <MainView {...this.props}/>
                        <SignupComp />
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

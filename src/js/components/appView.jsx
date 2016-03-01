define(['react', 'reactRedux', 'components/mainView/mainView', 'components/mainView/topbar'],
    function (React, ReactRedux, MainView, TopBar) {

        'use strict';
        var AppView = React.createClass({
            displayName: 'AppView',
            render: function () {
                return (
                    <div className='main border-simple'>
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

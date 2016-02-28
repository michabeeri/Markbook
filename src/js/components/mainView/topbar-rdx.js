define(['reactRedux', 'components/mainView/topbar'],
    function (ReactRedux, TopBar) {
        'use strict';

        return ReactRedux.connect(
            function (state) {
                return {
                    username: state.username
                };
            },
            function (dispatch) {
                return {
                    onLogout: function () {
                        dispatch({type: 'LOGOUT'});
                    }
                };
            }
        )(TopBar);
    });

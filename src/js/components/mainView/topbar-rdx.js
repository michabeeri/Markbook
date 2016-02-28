define(['reactRedux', 'components/mainView/topbar'],
    function (ReactRedux, TopBar) {
        'use strict';

        return ReactRedux.connect(
            null,
            function (dispatch) {
                return {
                    onLogout: function () {
                        dispatch({type: 'LOGOUT'});
                    }
                };
            }
        )(TopBar);
    });

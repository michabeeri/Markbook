define(['reactRedux', 'components/appView'],
    function (ReactRedux, AppView) {
        'use strict';

        return ReactRedux.connect(
            function (state) {
                return {
                    username: state.username,
                    bookmarks: state.bookmarks
                };
            },
            null
        )(AppView);
    });

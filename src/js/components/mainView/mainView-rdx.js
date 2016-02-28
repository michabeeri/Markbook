define(['reactRedux', 'components/mainView/mainView'],
    function (ReactRedux, MainView) {
        'use strict';

        return ReactRedux.connect(
            function (state) {
                return {
                    bookmarks: state.bookmarks
                };
            },
            null
        )(MainView);
    });

define(['lodash', 'constants'], function (_, Constants) {
    'use strict';

    var initialState = [
        {
            id: 'root',
            title: 'All Bookmarks'
        },
        {
            id: '0001',
            title: 'Fargo Season 2'
        },
        {
            id: '0002',
            title: 'Gaspar'
        },
        {
            id: '0003',
            title: 'bread'
        },
        {
            id: '0004',
            title: 'wallpaper'
        }
    ];

    return function currentBookmarkPath(state, action) {
        if (!state) {
            return initialState;
        }

        switch (action.type) {

            case Constants.NAVIGATE_TO_PREVIOUS_GROUP:
                var index = _.findIndex(state, {id: action.id});
                return state.slice(0, index + 1);

            default:
                return state;
        }
    };
});

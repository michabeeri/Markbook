define(['lodash', 'constants'], function (_, Constants) {
    'use strict';

    var initialState = [
        {
            id: 'root',
            title: 'All Bookmarks'
        },
        {
            id: '3234',
            title: 'Bla Bla'
        },
        {
            id: '1234',
            title: 'Test'
        },
        {
            id: '1111',
            title: 'Meow'
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
            case Constants.OPEN_BOOKMARK_GROUP:
                return state.concat({
                    id: action.id,
                    title: action.title
                });

            default:
                return state;
        }
    };
});

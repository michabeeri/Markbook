define(['uuid', 'constants', 'reducers/bookmarks'], function (uuid, Constants, bookmarksReducer) {
    'use strict';

    return function user(state, action) {
        switch (action.type) {
            case Constants.ADD_BOOKMARK:
            case Constants.REMOVE_BOOKMARK:
                return state
                    ? Object.assign({}, state, bookmarksReducer(state.bookmarks, action))
                    : state;

            case '@@redux/INIT':
                return {
                    username: 'user@wix.com',
                    bookmarks: [
                        {
                            id: uuid.v4(),
                            title: 'Fargo Season 2',
                            date: new Date(2015, 10, 18),
                            children: null
                        },
                        {
                            id: uuid.v4(),
                            title: 'Fargo Season 1',
                            date: new Date(2014, 11, 10),
                            children: null
                        },
                        {
                            id: uuid.v4(),
                            title: 'Bookmark 2 title',
                            date: new Date(2012, 10, 9),
                            children: null
                        },
                        {
                            id: uuid.v4(),
                            title: 'Gaspar Noe Movies',
                            date: new Date(2012, 10, 9),
                            children: Array(4).fill({})
                        }
                    ]
                };

            default:
                return state;
        }
    };
});

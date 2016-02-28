
define(['lodash', 'constants'], function (_, Constants) {

    'use strict';

    var initialState = [
            {
                id: '0000',
                title: 'Fargo Season 2',
                date: new Date(2015, 10, 18),
                children: null
            },
            {
                id: '0001',
                title: 'Fargo Season 1',
                date: new Date(2014, 11, 10),
                children: null
            },
            {
                id: '0002',
                title: 'Bookmark 2 title',
                date: new Date(2012, 10, 9),
                children: null
            },
            {
                id: '0003',
                title: 'Gaspar Noe Movies',
                date: new Date(2012, 10, 9),
                children: Array(4).fill({})
            }
        ];

    return function bookmarks(state, action) {
        if (!state) {
            return initialState;
        }

        switch (action.type) {
            case Constants.ADD_BOOKMARK:
                return (state ? state.slice() : []).concat({
                    id: action.id,
                    title: action.title,
                    date: action.date
                });
            case Constants.REMOVE_BOOKMARK:
                return _.reject(state, function (bm) {
                    return bm.id && bm.id === action.id;
                });


            default:
                return state;
        }
    };
});

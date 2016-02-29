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

            case Constants.OPEN_BOOKMARK_GROUP:
                // drill into group
                console.log('open ' + action.id);
                return state;

            case Constants.EDIT_BOOKMARK:
                // open edit modal
                console.log('edit ' + action.id);
                return state;

            case Constants.TOGGLE_BOOKMARK_SELECTION:
                return _.map(state, function (bm) {
                    if (bm.id === action.id) {
                        return Object.assign({}, bm, {selected: !bm.selected});

                    } else if (!action.isMultiSelect) {
                        return Object.assign({}, bm, {selected: false});

                    }
                    return bm;
                });

            case Constants.REMOVE_BOOKMARK:
                // should implement smarter logic here:
                // delete group if last item removed
                // open modal to ask before deleting group
                return _.reject(state, {id: action.id});


            default:
                return state;
        }
    };
});




































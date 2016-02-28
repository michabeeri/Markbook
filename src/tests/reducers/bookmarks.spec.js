define(['lodash', 'constants', 'reducers/bookmarks'],
    function (_, constants, bookmarks) {
        'use strict';

        describe('Bookmarks reducer', function () {

            it('should add bookmark', function () {
                var initialState = Array(4).fill({});
                var bookmark = {
                    id: _.uniqueId(),
                    title: 'Office Space',
                    date: new Date(19, 3, 1999)
                };
                var action = Object.assign({}, bookmark, {type: constants.ADD_BOOKMARK});
                var newState = bookmarks(initialState, action);
                expect(_.find(newState, function (bm) {
                    return bm.id && bm.id === bookmark.id;
                })).toEqual(bookmark);
            });

            it('should delete bookmark', function () {
                var initialState = Array(4).fill({}).concat({id: '0000'});
                var action = {type: constants.REMOVE_BOOKMARK, id: '0000'};
                var newState = bookmarks(initialState, action);
                expect(_.find(newState, function (bm) {
                    return bm.id && bm.id === '0000';
                })).toBe(undefined);
            });

        });
    });

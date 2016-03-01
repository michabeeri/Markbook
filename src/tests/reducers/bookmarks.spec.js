define(['lodash', 'constants', 'reducers/bookmarks'],
    function (_, constants, bookmarks) {
        'use strict';

        describe('Bookmarks reducer', function () {

            it('should add bookmark', function () {
                var initialState = Array(4).fill({});
                var bookmark = {
                    id: _.uniqueId(),
                    title: 'Office Space',
                    date: new Date(19, 3, 1999),
                    url: 'www.google.com'
                };
                var action = Object.assign({}, bookmark, {type: constants.ADD_BOOKMARK});
                var newState = bookmarks(initialState, action);
                expect(_.find(newState, {id: bookmark.id})).toEqual(bookmark);
            });

            it('should delete bookmark', function () {
                var initialState = Array(4).fill().concat({id: '0000'});
                var action = {type: constants.REMOVE_BOOKMARK, id: '0000'};
                var newState = bookmarks(initialState, action);
                expect(_.find(newState, {id: '0000'})).toBeUndefined();
            });

            it('should toggle bookmark selection with multi-select', function () {
                var initialState = [{id: '1111', selected: true}, {id: '0000'}];
                var action = {type: constants.TOGGLE_BOOKMARK_SELECTION, id: '0000', isMultiSelect: true};
                var newState = bookmarks(initialState, action);
                expect(_.find(newState, {id: '0000'}).selected).toBeTruthy();
                expect(_.find(newState, {id: '1111'}).selected).toBeTruthy();
                newState = bookmarks(newState, action);
                expect(_.find(newState, {id: '0000'}).selected).toBeFalsy();
                expect(_.find(newState, {id: '1111'}).selected).toBeTruthy();
            });

            it('should toggle bookmark selection without multi-select', function () {
                var initialState = [{id: '1111', selected: true}, {id: '0000'}];
                var action = {type: constants.TOGGLE_BOOKMARK_SELECTION, id: '0000'};
                var newState = bookmarks(initialState, action);
                expect(_.find(newState, {id: '0000'}).selected).toBeTruthy();
                expect(_.find(newState, {id: '1111'}).selected).toBeFalsy();
            });

        });
    });

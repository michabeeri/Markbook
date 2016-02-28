define(['lodash', 'constants', 'reducers/bookmarks', 'reducers/user'],
    function (_, Constants, bookmarks, user) {
        'use strict';

        describe('User reducer', function () {

            xit('should delegete bookmark related action (add, remove) to bookmark reducer', function () {
                var state = {};
                _.forEach([Constants.ADD_BOOKMARK, Constants.REMOVE_BOOKMARK], function (actionType) {
                    var action = {type: actionType};
                    var mockBookmarks = jasmine.createSpy('bookmarks');
                    user(state, action);
                    expect(mockBookmarks).toHaveBeenCalledWith(state, action);
                });
            });
        });
    });

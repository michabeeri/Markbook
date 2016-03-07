define(['react', 'constants', 'reactDOM', 'components/mainView/mainView', 'components/bookmarkList/bookmarkList', 'components/toolbar/toolbar'],
    function (React, constants, ReactDOM, MainView, BookmarkList, Toolbar) {
        'use strict';

        var TestUtils = React.addons.TestUtils;

        describe('Main View', function () {

            describe('Empty state', function () {
                var mainView;

                beforeEach(function () {
                    var dispatchSpy = jasmine.createSpy('dispatch');
                    var state =
                    {
                        bookmarks: [{
                            id: constants.ROOT_GROUP_ID,
                            title: 'All Bookmarks',
                            date: new Date(2015, 10, 18),
                            children: [],
                            tags: []
                        }],
                        layout: {
                            layoutType: constants.layoutType.GRID
                        },
                        flags: {}
                    };
                    state.flags[constants.BOOKMARKS_LOADED] = true;
                    mainView = TestUtils.renderIntoDocument(<MainView dispatch={dispatchSpy}
                                                                      state={state}/>);
                });

                it('should render with correct display name', function () {
                    expect(mainView.constructor.displayName).toBe('MainView');
                });

                it('should not have a topbar', function () {
                    expect(TestUtils.scryRenderedComponentsWithType(mainView, Toolbar).length).toBe(0);
                });

                it('should not have a bookmarkList', function () {
                    expect(TestUtils.scryRenderedComponentsWithType(mainView, BookmarkList).length).toBe(0);
                });

                it('should have add button', function () {
                    expect(TestUtils.scryRenderedDOMComponentsWithClass(mainView, 'fa-plus-circle').length).toBe(1);
                });
            });


        });
    });

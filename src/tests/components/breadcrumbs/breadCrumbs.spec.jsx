define(['react',
        'reactDOM',
        'components/breadcrumbs/breadCrumbs',
        'actionProviders/actions',
        'constants'],
    function (React, ReactDOM, BreadCrumbs, ActionProvider, Constants) {
        'use strict';

        var TestUtils = React.addons.TestUtils;

        describe('Bread Crumbs', function () {

            var breadCrumbs;

            function dispatcherMock() {
            }

            function renderBreadCrumbs(dispatcher, bookmarks, path) {
                breadCrumbs = TestUtils.renderIntoDocument(<BreadCrumbs
                    dispatch={dispatcher}
                    bookmarks={bookmarks}
                    currentPath={path}/>);
            }

            function getItemElements() {
                return TestUtils.scryRenderedDOMComponentsWithTag(breadCrumbs, 'span');
            }

            describe('onItemClick', function () {
                it('should dispatch navigateToPreviousGroup action with correct id', function () {
                    var CLICKED_GROUP_ID = 'CLICKED_GROUP_ID';
                    var CURRENT_GROUP_ID = 'CURRENT_GROUP_ID';

                    var bookmarks = [{id: Constants.ROOT_GROUP_ID}, {id: CLICKED_GROUP_ID}, {id: CURRENT_GROUP_ID}];
                    var path = [Constants.ROOT_GROUP_ID, CLICKED_GROUP_ID, CURRENT_GROUP_ID];

                    var dispatcherSpy = jasmine.createSpy('dispatcherMock');
                    var expectedActionProvider = ActionProvider.navigateToPreviousGroup(CLICKED_GROUP_ID);


                    renderBreadCrumbs(dispatcherSpy, bookmarks, path);

                    var clickedGroupItem = getItemElements()[1];
                    TestUtils.Simulate.click(clickedGroupItem);

                    expect(dispatcherSpy).toHaveBeenCalledWith(expectedActionProvider);
                });

                it('should not dispatch navigateToPreviousGroup action on current group item click', function () {
                    var bookmarks = [{id: Constants.ROOT_GROUP_ID}];
                    var path = [Constants.ROOT_GROUP_ID];

                    var dispatcherSpy = jasmine.createSpy('dispatcherMock');

                    renderBreadCrumbs(dispatcherSpy, bookmarks, path);

                    var clickedGroupItem = getItemElements()[0];
                    TestUtils.Simulate.click(clickedGroupItem);

                    expect(dispatcherSpy).not.toHaveBeenCalled();
                });
            });

            describe('render', function () {
                it('should render root level correctly', function () {
                    var EXPECTED_ROOT_GROUP_TITLE = 'EXPECTED_ROOT_GROUP_TITLE';
                    var bookmarks = [{
                        id: Constants.ROOT_GROUP_ID,
                        title: EXPECTED_ROOT_GROUP_TITLE
                    }];
                    var path = [Constants.ROOT_GROUP_ID];

                    renderBreadCrumbs(dispatcherMock, bookmarks, path);
                    var rootGroup = getItemElements()[0];
                    expect(rootGroup.innerHTML).toBe(EXPECTED_ROOT_GROUP_TITLE);
                });

                it('should render two levels correctly', function () {
                    var EXPECTED_ROOT_GROUP_TITLE = 'EXPECTED_ROOT_GROUP_TITLE';
                    var EXPECTED_CURRENT_GROUP_TITLE = 'EXPECTED_CURRENT_GROUP_TITLE';
                    var CURRENT_GROUP_ID = 'currentGroupId';

                    var bookmarks = [
                        {
                            id: Constants.ROOT_GROUP_ID,
                            title: EXPECTED_ROOT_GROUP_TITLE
                        },
                        {
                            id: CURRENT_GROUP_ID,
                            title: EXPECTED_CURRENT_GROUP_TITLE
                        }
                    ];
                    var path = [Constants.ROOT_GROUP_ID, CURRENT_GROUP_ID];

                    renderBreadCrumbs(dispatcherMock, bookmarks, path);

                    var items = getItemElements();
                    var rootGroup = items[0];
                    var currentGroup = items[1];

                    expect(rootGroup.innerHTML).toBe(EXPECTED_ROOT_GROUP_TITLE);
                    expect(currentGroup.innerHTML).toBe(EXPECTED_CURRENT_GROUP_TITLE);
                });

                it('should render three levels correctly', function () {
                    var EXPECTED_ROOT_GROUP_TITLE = 'EXPECTED_ROOT_GROUP_TITLE';
                    var EXPECTED_PARENT_GROUP_TITLE = 'EXPECTED_PARENT_GROUP_TITLE';
                    var EXPECTED_CURRENT_GROUP_TITLE = 'EXPECTED_CURRENT_GROUP_TITLE';
                    var PARENT_GROUP_ID = 'parentGroupId';
                    var CURRENT_GROUP_ID = 'currentGroupId';

                    var bookmarks = [
                        {
                            id: Constants.ROOT_GROUP_ID,
                            title: EXPECTED_ROOT_GROUP_TITLE
                        },
                        {
                            id: PARENT_GROUP_ID,
                            title: EXPECTED_PARENT_GROUP_TITLE
                        },
                        {
                            id: CURRENT_GROUP_ID,
                            title: EXPECTED_CURRENT_GROUP_TITLE
                        }
                    ];
                    var path = [Constants.ROOT_GROUP_ID, PARENT_GROUP_ID, CURRENT_GROUP_ID];

                    renderBreadCrumbs(dispatcherMock, bookmarks, path);

                    var items = getItemElements();
                    var rootGroup = items[0];
                    var parentGroup = items[1];
                    var currentGroup = items[2];

                    expect(rootGroup.innerHTML).toBe(EXPECTED_ROOT_GROUP_TITLE);
                    expect(parentGroup.innerHTML).toBe(EXPECTED_PARENT_GROUP_TITLE);
                    expect(currentGroup.innerHTML).toBe(EXPECTED_CURRENT_GROUP_TITLE);
                });

                it('should render more than three levels correctly', function () {
                    var EXPECTED_ROOT_GROUP_TITLE = 'EXPECTED_ROOT_GROUP_TITLE';
                    var EXPECTED_GRANDPARENT_GROUP_TITLE_IN_VIEW = '...';
                    var EXPECTED_GRANDPARENT_GROUP_TITLE = 'EXPECTED_GRANDPARENT_GROUP_TITLE';
                    var EXPECTED_PARENT_GROUP_TITLE = 'EXPECTED_PARENT_GROUP_TITLE';
                    var EXPECTED_CURRENT_GROUP_TITLE = 'EXPECTED_CURRENT_GROUP_TITLE';
                    var GRANDPARENT_GROUP_ID = 'grandParentGroupId';
                    var PARENT_GROUP_ID = 'parentGroupId';
                    var CURRENT_GROUP_ID = 'currentGroupId';

                    var bookmarks = [
                        {
                            id: Constants.ROOT_GROUP_ID,
                            title: EXPECTED_ROOT_GROUP_TITLE
                        },
                        {
                            id: GRANDPARENT_GROUP_ID,
                            title: EXPECTED_GRANDPARENT_GROUP_TITLE
                        },
                        {
                            id: PARENT_GROUP_ID,
                            title: EXPECTED_PARENT_GROUP_TITLE
                        },
                        {
                            id: CURRENT_GROUP_ID,
                            title: EXPECTED_CURRENT_GROUP_TITLE
                        }
                    ];
                    var path = [Constants.ROOT_GROUP_ID, GRANDPARENT_GROUP_ID, PARENT_GROUP_ID, CURRENT_GROUP_ID];

                    renderBreadCrumbs(dispatcherMock, bookmarks, path);

                    var items = getItemElements();
                    var rootGroup = items[0];
                    var grandParentGroup = items[1];
                    var parentGroup = items[2];
                    var currentGroup = items[3];

                    expect(rootGroup.innerHTML).toBe(EXPECTED_ROOT_GROUP_TITLE);
                    expect(grandParentGroup.innerHTML).toBe(EXPECTED_GRANDPARENT_GROUP_TITLE_IN_VIEW);
                    expect(parentGroup.innerHTML).toBe(EXPECTED_PARENT_GROUP_TITLE);
                    expect(currentGroup.innerHTML).toBe(EXPECTED_CURRENT_GROUP_TITLE);
                });
            });
        });
    });

define(['react', 'components/mainView/topbar', 'components/constants'],
    function (React, TopBar, Constants) {
        'use strict';

        var testUtils = React.addons.TestUtils;

        describe('top bar', function () {

            var topBar;
            var username = 'username';

            beforeEach(function () {
                topBar = testUtils.renderIntoDocument(<TopBar username={username} />);
            });

            it('should show the logo of the app', function () {
                expect(function () {
                    testUtils.findRenderedDOMComponentWithClass(topBar, 'top-bar-logo');
                }).not.toThrowError();
            });

            it('should show the name of the app', function () {
                var appNameNode;
                expect(function () {
                    appNameNode = testUtils.findRenderedDOMComponentWithClass(topBar, 'top-bar-name');
                }).not.toThrowError();
                expect(appNameNode.innerHTML).toEqual(Constants.APP_NAME);

            });

            it('should show the email of the connected user', function () {
                var usernameNode = null;
                expect(function () {
                    usernameNode = testUtils.findRenderedDOMComponentWithClass(topBar, 'top-bar-username');
                }).not.toThrowError();

                expect(usernameNode).not.toBeNull();
                expect(usernameNode.innerHTML).toEqual(username);

            });

            it('should show a log out button', function () {
                var usernameNode = null;
                expect(function () {
                    usernameNode = testUtils.findRenderedDOMComponentWithClass(topBar, 'logout-btn');
                }).not.toThrowError();

                expect(usernameNode).not.toBeNull();
                expect(usernameNode.innerHTML).toEqual('Log out');
            });

            it('should throw an error if there is no connected user', function () {
                var props = {
                    prop: 'some prop'
                };
                var topBarElement = React.createElement(TopBar, props);
                expect(function () {
                    testUtils.renderIntoDocument(topBarElement);
                }).toThrowError();
            });
        });

    });

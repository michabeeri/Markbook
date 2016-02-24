define(['react', 'components/mainView/topbar'],
    function (React, TopBar) {
        'use strict';

        var testUtils = React.addons.TestUtils;

        describe('top bar', function () {
            it('should show the logo of the app', function () {
                var props = {
                    username: 'username'
                };
                var topBarElement = React.createElement(TopBar, props);
                var topBarComp = testUtils.renderIntoDocument(topBarElement);

                expect(function () {
                    testUtils.findRenderedDOMComponentWithClass(topBarComp, 'top-bar-logo');
                }).not.toThrowError();
            });

            it('should show the name of the app', function () {
                var props = {
                    username: 'username'
                };
                var topBarElement = React.createElement(TopBar, props);
                var topBarComp = testUtils.renderIntoDocument(topBarElement);

                expect(function () {
                    testUtils.findRenderedDOMComponentWithClass(topBarComp, 'top-bar-name');
                }).not.toThrowError();

            });

            it('should show the email of the connected user', function () {
                var props = {
                    username: 'username'
                };
                var topBarElement = React.createElement(TopBar, props);
                var topBarComp = testUtils.renderIntoDocument(topBarElement);

                var usernameNode = null;
                expect(function () {
                    usernameNode = testUtils.findRenderedDOMComponentWithClass(topBarComp, 'top-bar-username');
                }).not.toThrowError();

                expect(usernameNode).not.toBeNull();
                expect(usernameNode.innerHTML).toEqual(props.username);

            });

            it('should show a log out button', function () {
                var props = {
                    username: 'username'
                };
                var topBarElement = React.createElement(TopBar, props);
                var topBarComp = testUtils.renderIntoDocument(topBarElement);

                var usernameNode = null;
                expect(function () {
                    usernameNode = testUtils.findRenderedDOMComponentWithClass(topBarComp, 'logout-btn');
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

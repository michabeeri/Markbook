define(['react', 'components/mainView/topbar', 'constants'],
    function (React, TopBar, Constants) {
        'use strict';

        var testUtils = React.addons.TestUtils;

        describe('top bar', function () {

            var topBar;
            var username = 'username';

            beforeEach(function () {
                topBar = testUtils.renderIntoDocument(<TopBar state={{username: username}} dispatch={function(){}}/>);
            });

            it('should show the logo of the app', function () {
                var logoNode = testUtils.findRenderedDOMComponentWithClass(topBar, 'top-bar-logo');
                expect(logoNode).toBeTruthy();
            });

            it('should show the name of the app', function () {
                var appNameNode = testUtils.findRenderedDOMComponentWithClass(topBar, 'top-bar-name');
                expect(appNameNode).toBeTruthy();
                expect(appNameNode.innerHTML).toEqual(Constants.APP_NAME);

            });

            it('should show the email of the connected user', function () {
                var usernameNode = testUtils.findRenderedDOMComponentWithClass(topBar, 'top-bar-username');
                expect(usernameNode).toBeTruthy();
                expect(usernameNode.innerHTML).toEqual(username);

            });

            it('should show a log out button', function () {
                var logoutNode = testUtils.findRenderedDOMComponentWithClass(topBar, 'logout-btn');
                expect(logoutNode).toBeTruthy();
                expect(logoutNode.innerHTML).toEqual('Log out');
            });

            xit('should not show username if there is no connected user', function () {
                topBar = testUtils.renderIntoDocument(<TopBar />);
                var usernameNode = testUtils.findRenderedDOMComponentWithClass(topBar, 'top-bar-username');
                expect(usernameNode.innerHTML).toEqual('');
            });

            xit('should call onLogout when clicking the logout button', function () {
                var onLogoutSpy = jasmine.createSpy('onLogoutSpy');
                topBar = testUtils.renderIntoDocument(<TopBar username={username} onLogout={onLogoutSpy} />);
                var logoutNode = testUtils.findRenderedDOMComponentWithClass(topBar, 'logout-btn');

                testUtils.Simulate.click(logoutNode);

            });
        });

    });

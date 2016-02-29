define(['react', 'components/toolbar/toolbar'],
    function (React, ToolBar) {
        'use strict';

        var testUtils = React.addons.TestUtils;

        describe('tool bar', function () {

            var toolBar;

            beforeEach(function () {
                toolBar = testUtils.renderIntoDocument(<ToolBar state={{}} dispatch={function(){}}/>);
            });

            it ('should show a search box with Search placeholder', function () {
                var searchNode = testUtils.findRenderedDOMComponentWithClass(toolBar, 'search-box');
                expect(searchNode).toBeTruthy();
            });
        });

    });































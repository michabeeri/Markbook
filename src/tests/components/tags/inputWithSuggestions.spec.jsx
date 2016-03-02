define(['React', 'reactDOM', 'components/tags/inputWithSuggestions'],
    function (React, ReactDOM, InputWithSuggestions) {
        'use strict';

        var ReactTestUtils = React.addons.TestUtils;

        describe('InputWithSuggestions', function () {

            var props;
            beforeEach(function () {
                props = {
                    onInputSelected: function () {
                    },
                };
                spyOn(props, 'onInputSelected');
            });

            function renderInputWithData(tag) {
                var instance = React.createElement(InputWithSuggestions, props);
                var tagInput = ReactTestUtils.renderIntoDocument(instance);
                tagInput.refs.input.value = tag;
                return tagInput;
            }

            describe('when the text field is empty', function () {

                it('should not call onInputSelected when clicking enter', function () {
                    var tagInput = renderInputWithData('');
                    ReactTestUtils.Simulate.keyDown(tagInput.refs.input, {keyCode: 13});
                    expect(props.onInputSelected).not.toHaveBeenCalled();
                });

                it('should not display dropdown', function () {
                    var tagInput = renderInputWithData('');
                    var dropdown = ReactTestUtils.scryRenderedDOMComponentsWithTag(tagInput, 'DropDown');
                    expect(dropdown.length).toEqual(0);
                });

            });

            describe('when a text was entered', function () {

                it('should display dropdown', function () {
                    var tagInput = renderInputWithData('test');
                    var dropdown = ReactTestUtils.scryRenderedDOMComponentsWithTag(tagInput, 'DropDown');
                    expect(dropdown).toBeDefined();
                });

                it('should call onInputSelected with the text when clicking enter', function () {
                    var tagInput = renderInputWithData('testTag');
                    ReactTestUtils.Simulate.keyDown(tagInput.refs.input, {keyCode: 13});
                    expect(props.onInputSelected).toHaveBeenCalledWith(tagInput.refs.input.value);
                });

                it('should hide dropdown when clicking enter', function () {
                    var tagInput = renderInputWithData('testTag');
                    ReactTestUtils.Simulate.keyDown(tagInput.refs.input, {keyCode: 13});
                    var dropdown = ReactTestUtils.scryRenderedDOMComponentsWithTag(tagInput, 'DropDown');
                    expect(dropdown.length).toEqual(0);
                });
            });
        });
    });

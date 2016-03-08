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
                    valueLink: {
                        value: 'tag'
                    },
                    suggestions: {
                        input: 't',
                        items: [{title: 'Bookmarks', groupType: 'bookmark', lines: ['name1', 'name2', 'name3']},
                            {title: 'Tags', groupType: 'tag', lines: ['tag1', 'tag2', 'tag3']},
                            {title: 'Random', groupType: 'random', lines: []}]
                    }
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
                    ReactTestUtils.Simulate.keyUp(tagInput.refs.input, {keyCode: 13});
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
                    var tagInput = renderInputWithData('tag');
                    ReactTestUtils.Simulate.keyUp(tagInput.refs.input, {keyCode: 65});
                    expect(tagInput.state.isEditing).toBeTruthy();
                });

                it('should call onInputSelected with the text when clicking enter', function () {
                    var tagInput = renderInputWithData('tag');
                    ReactTestUtils.Simulate.keyUp(tagInput.refs.input, {keyCode: 13});
                    expect(props.onInputSelected).toHaveBeenCalledWith('name1','bookmark');
                });

                it('should hide dropdown when clicking enter', function () {
                    var tagInput = renderInputWithData('tag');
                    ReactTestUtils.Simulate.keyUp(tagInput.refs.input, {keyCode: 65});
                    ReactTestUtils.Simulate.keyUp(tagInput.refs.input, {keyCode: 13});
                    expect(tagInput.state.isEditing).toBeFalsy();
                });

                xit('should hide dropdown when the input field loses focus', function () {
                    var tagInput = renderInputWithData('test');
                    ReactTestUtils.Simulate.keyUp(tagInput.refs.input, {keyCode: 65});
                    ReactTestUtils.Simulate.blur(tagInput.refs.input);
                    expect(tagInput.state.isEditing).toBeFalsy();
                });
            });
        });
    });

define(['React', 'reactDOM', 'components/tags/tagInput'],
    function (React, ReactDOM, TagInput) {
        'use strict';

        var ReactTestUtils = React.addons.TestUtils;

        describe('TagInput', function () {

            var props;
            beforeEach(function () {
                props = {
                    addTag: function () {
                    },
                    tags: []
                };
                spyOn(props, 'addTag');
            });

            function renderTagInputWithData(tag) {
                var instance = React.createElement(TagInput, props);
                var tagInput = ReactTestUtils.renderIntoDocument(instance);
                tagInput.refs.input.value = tag;
                return tagInput;
            }

            describe('when the text field is empty', function () {

                it('should not add a tag when clicking enter', function () {
                    var tagInput = renderTagInputWithData('');
                    ReactTestUtils.Simulate.keyDown(tagInput.refs.input, {keyCode: 13});
                    expect(props.addTag).not.toHaveBeenCalled();
                });

                it('should not add a tag when clicking comma', function () {
                    var tagInput = renderTagInputWithData('');
                    ReactTestUtils.Simulate.keyDown(tagInput.refs.input, {keyCode: 188});
                    expect(props.addTag).not.toHaveBeenCalled();
                });

                it('should not display dropdown', function () {
                    var tagInput = renderTagInputWithData('');
                    var dropdown = ReactTestUtils.scryRenderedDOMComponentsWithTag(tagInput, 'DropDown');
                    expect(dropdown).toEqual([]);
                });

            });

            describe('when a text was entered', function () {

                it('should call saveTag with the text when clicking enter', function () {
                    var tagInput = renderTagInputWithData('testTag');
                    ReactTestUtils.Simulate.keyDown(tagInput.refs.input, {keyCode: 13});
                    expect(props.addTag).toHaveBeenCalledWith(tagInput.refs.input.value);
                });

                it('should call saveTag with the text when clicking comma', function () {
                    var tagInput = renderTagInputWithData('testTag');
                    var input = tagInput.refs.input;
                    ReactTestUtils.Simulate.keyDown(input, {keyCode: 188});
                    expect(props.addTag).toHaveBeenCalledWith(input.value);
                });

                it('should display dropdown', function () {
                    var tagInput = renderTagInputWithData('test');
                    var dropdown = ReactTestUtils.scryRenderedDOMComponentsWithTag(tagInput, 'DropDown');
                    expect(dropdown).toBeDefined();
                });
            });

            it('getDataForDropdown should return an object with the filtered data', function () {
                var filter = 'he';
                var tagInput = renderTagInputWithData('testTag');
                var data = tagInput.getDataForDropdown(filter, ['he', 'a', 'hel', 'hb']);
                var expectedData = {
                    input: filter,
                    items: [{title: 'Tags', groupType: 'tag', lines: ['he', 'hel']}]
                };
                expect(data).toEqual(expectedData);
            });


            it('should clear input after tag is added', function () {
                var tagInput = renderTagInputWithData('testTag');
                var input = tagInput.refs.input;
                ReactTestUtils.Simulate.keyDown(input, {keyCode: 13});
                expect(input.value).toEqual('');
            });
        });
    });

define(['React', 'reactDOM', 'components/tags/tagInput'],
    function (React, ReactDOM, TagInput) {
        'use strict';

        var ReactTestUtils = React.addons.TestUtils;

        describe('TagInput', function () {

            var props;
            beforeEach(function () {
                props = {
                    addTag: function () {
                    }
                };
                spyOn(props, 'addTag');
            });

            function renderTagInputWithData(tag) {
                var instance = React.createElement(TagInput, props);
                var tagInput = ReactTestUtils.renderIntoDocument(instance);
                tagInput.refs.input.value = tag;
                return tagInput;
            }

            it('should call saveTag when clicking enter with the input text', function () {
                var tagInput = renderTagInputWithData('testTag');
                ReactTestUtils.Simulate.keyDown(tagInput.refs.input, {keyCode: 13});
                expect(props.addTag).toHaveBeenCalledWith(tagInput.refs.input.value);
            });

            it('should call saveTag when clicking comma with the input text (without comma)', function () {
                var tagInput = renderTagInputWithData('testTag');
                var input = tagInput.refs.input;
                ReactTestUtils.Simulate.keyDown(input, {keyCode: 188});
                expect(props.addTag).toHaveBeenCalledWith(input.value);
            });

            it('should clear input after tag is added', function () {
                var tagInput = renderTagInputWithData('testTag');
                var input = tagInput.refs.input;
                ReactTestUtils.Simulate.keyDown(input, {keyCode: 13});
                expect(input.value).toEqual('');
            });
        });
    });

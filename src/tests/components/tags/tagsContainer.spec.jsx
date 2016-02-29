define(['React', 'components/tags/tagsContainer'],
    function (React, TagsContainer) {
        'use strict';

        var ReactTestUtils = React.addons.TestUtils;

        describe('TagsContainer', function () {

            var props;
            var tag = 'test';
            beforeEach(function () {
                props = {
                    tags: [],
                    addTag: function () {
                    },
                    removeTag: function () {
                    }
                };
            });

            it('should call the addTag callback when a new tag is added', function () {
                spyOn(props, 'addTag');
                var instance = React.createElement(TagsContainer, props);
                var tags = ReactTestUtils.renderIntoDocument(instance);
                tags.addTag(tag);
                expect(props.addTag).toHaveBeenCalledWith(tag);
            });

            it('should call the removeTag callback when a tag is removed', function () {
                spyOn(props, 'removeTag');
                var instance = React.createElement(TagsContainer, props);
                var tags = ReactTestUtils.renderIntoDocument(instance);
                tags.removeTag(tag);
                expect(props.removeTag).toHaveBeenCalledWith(tag);
            });
        })
    });

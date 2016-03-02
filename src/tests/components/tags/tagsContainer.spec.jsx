define(['React', 'components/tags/tagsContainer'],
    function (React, TagsContainer) {
        'use strict';

        var ReactTestUtils = React.addons.TestUtils;

        describe('TagsContainer', function () {

            var props;
            var newTag = 'test';
            var existingTag = 'tag3';
            beforeEach(function () {
                props = {
                    tags: ['tag1', 'tag2', existingTag, 'fargo'],
                    addTag: function () {
                    },
                    removeTag: function () {
                    },
                    bookmarks: [
                        {
                            tags: ['fargo', 'season2']
                        },
                        {
                            tags: ['fargo', 'season1']
                        }]
                };
            });

            describe('addTag', function () {

                beforeEach(function () {
                    spyOn(props, 'addTag');
                });

                it('should call the addTag callback with the tag when a tag is added', function () {
                    var instance = React.createElement(TagsContainer, props);
                    var tags = ReactTestUtils.renderIntoDocument(instance);
                    tags.addTag(newTag);
                    expect(props.addTag).toHaveBeenCalledWith(newTag);
                });

                it('should not call the addTag callback when the tag already exists', function () {
                    var instance = React.createElement(TagsContainer, props);
                    var tags = ReactTestUtils.renderIntoDocument(instance);
                    tags.addTag(existingTag);
                    expect(props.addTag).not.toHaveBeenCalled();
                });

                it('should clear input after tag is added', function () {
                    var instance = React.createElement(TagsContainer, props);
                    var tags = ReactTestUtils.renderIntoDocument(instance);
                    tags.addTag(newTag);
                    expect(tags.state.input).toEqual('');
                });
            });

            describe('removeTag', function () {

                it('should call the removeTag callback with the tag when a tag is removed', function () {
                    spyOn(props, 'removeTag');
                    var instance = React.createElement(TagsContainer, props);
                    var tags = ReactTestUtils.renderIntoDocument(instance);
                    tags.removeTag(newTag);
                    expect(props.removeTag).toHaveBeenCalledWith(newTag);
                });
            });

            it('should remove existing tags from suggested user tags', function () {
                var instance = React.createElement(TagsContainer, props);
                var tags = ReactTestUtils.renderIntoDocument(instance);
                var suggestions = tags.getFilteredUserTags('fargo')
                expect(suggestions.items[0].lines).not.toContain('fargo');
            });
        })
    });

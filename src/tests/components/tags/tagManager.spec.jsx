define(['React', 'reactDOM', 'components/tags/tagManager'],
    function (React, ReactDOM, TagManager) {
        'use strict';

        describe('tagManager', function () {

            var tagManager;
            beforeEach(function () {
                tagManager = new TagManager();
            });

            it('should include newly added tag', function () {
                var tag = 'test';
                tagManager.addTag(tag);
                expect(tagManager.getTags()).toContain(tag);
            });

            it('should not include removed tag', function () {
                var tag = 'test';
                tagManager.addTag(tag);
                tagManager.removeTag(tag);
                expect(tagManager.getTags()).not.toContain(tag);
            })
        });
    });

define(['lodash', 'react'], function (_, React) {
    'use strict';

    function TagManager() {
        this.tags = [];
    }

    TagManager.prototype.getTags = function () {
        return this.tags;
    };

    TagManager.prototype.addTag = function (tag) {
        this.tags.push(tag);
    };

    TagManager.prototype.removeTag = function (tag) {
        _.pull(this.tags, tag);
    };

    return TagManager;
});

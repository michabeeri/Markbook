define(['React', 'reactDOM', 'components/tags/tagsList'],
    function (React, ReactDOM, TagsList) {
        'use strict';

        var ReactTestUtils = React.addons.TestUtils;

        var props;
        beforeEach(function(){
            props = {
                tags: ['tag1','tag2', 'tag3'],
                removeTag: function () {
                }
            };
        });

        it('should render a list the same length as the props length',function(){
            var instance = React.createElement(TagsList, props);
            var tagList = ReactTestUtils.renderIntoDocument(instance);
            expect(tagList.refs.list.children.length).toEqual(props.tags.length);
        });
    });

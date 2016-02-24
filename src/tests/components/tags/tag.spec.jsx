define(['React', 'reactDOM', 'components/tags/tag'],
    function (React, ReactDOM, Tag) {

        var ReactTestUtils = React.addons.TestUtils;

        describe('Tag', function () {

            var props;
            beforeEach(function () {
                props = {
                    tag: 'test-tag',
                    removeTag: function (event) {
                    }
                };
            });

            it('should show tag in the DOM', function () {
                var instance = React.createElement(Tag, props);
                var tag = ReactTestUtils.renderIntoDocument(instance);
                expect(tag.refs.title.innerHTML).toMatch(props.tag);

            });

            it('should call removeTag when clicking on the remove button', function () {
                spyOn(props, 'removeTag');
                var instance = React.createElement(Tag, props);
                var tag = ReactTestUtils.renderIntoDocument(instance);
                ReactTestUtils.Simulate.click(tag.refs.removeBtn);
                expect(props.removeTag).toHaveBeenCalledWith(props.tag);

            })
        });
    });

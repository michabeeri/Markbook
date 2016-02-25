define(['react', 'mixins/draggable'],
    function (React, draggable) {
        'use strict';

        var TestUtils = React.addons.TestUtils;

        var MyComp = React.createClass({
            mixins: [draggable],
            render: function() {
                return <div className={'classNames ' + this.getDragClass()} onDragStart={this.onDragStart}></div>;
            }
        })

        describe('Draggable item', function () {

            it('should receive dragged className on drag start', function () {
                var comp = TestUtils.renderIntoDocument(<MyComp/>);
                TestUtils.Simulate.dragStart(comp.getDOMNode());
                expect(comp.getDOMNode().classList.contains('dragged')).toBe(true);
            });

            it('should have no dragged className after drag end', function () {
                var comp = TestUtils.renderIntoDocument(<MyComp/>);
                TestUtils.Simulate.dragEnd(comp.getDOMNode());
                expect(comp.getDOMNode().classList.contains('dragged')).toBe(false);
            });
        });
    });

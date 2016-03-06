define(['react', 'reactDOM', 'constants', 'components/bookmarkList/bookmark'],
    function (React, ReactDOM, Constants, Bookmark) {
        'use strict';

        var TestUtils = React.addons.TestUtils;

        describe('Bookmark', function () {

            var bookmark,
                bookmarkData,
                dragStart,
                dragOver,
                dragEnd;

            beforeEach(function () {
                bookmarkData = {
                    title: 'Fargo Season 2',
                    date: new Date(2015, 10, 18)
                };
                dragStart = jasmine.createSpy('dragStart');
                dragOver = jasmine.createSpy('dragOver');
                dragEnd = jasmine.createSpy('dragEnd');
                bookmark = TestUtils.renderIntoDocument(<Bookmark bookmarkData={bookmarkData}
                                                                  layout={Constants.layoutType.GRID}
                                                                  dragStart={dragStart}
                                                                  dragOver={dragOver}
                                                                  dragEnd={dragEnd}
                                                                  state={{selectedBookmarks: {selectedBookmarksIds: []}}}
                                                                  dataId='bm001'/>);

                jasmine.clock().install();
            });

            afterEach(function () {
                jasmine.clock().uninstall();
            });

            it('should have a draggable attribute', function () {
                expect(ReactDOM.findDOMNode(bookmark).getAttribute('draggable')).toBeTruthy();
            });

            it('should call dragStart callback when being dragged', function (done) {
                var mockDataTransfer = {
                    setData: function () {
                    }
                };
                TestUtils.Simulate.dragStart(ReactDOM.findDOMNode(bookmark), {dataTransfer: mockDataTransfer});
                jasmine.clock().tick(51);
                expect(dragStart).toHaveBeenCalledWith('bm001');
                done();
            });

            it('should call dragOver callback when being dragged over', function () {
                TestUtils.Simulate.dragOver(ReactDOM.findDOMNode(bookmark));
                expect(dragOver).toHaveBeenCalledWith('bm001');
            });

            it('should call dragEnd callback when being dropped', function () {
                TestUtils.Simulate.dragEnd(ReactDOM.findDOMNode(bookmark));
                expect(dragEnd).toHaveBeenCalledWith();
            });

            it('should not have a dragged class when receives a falsy dragClass prop', function () {
                expect(ReactDOM.findDOMNode(bookmark).classList).not.toContain('dragged');
            });

            it('should have a dragged class when receives a truthy dragClass prop', function () {
                var draggedBookmark = TestUtils.renderIntoDocument(<Bookmark bookmarkData={bookmarkData}
                                                                             dragClass='true'/>);
                expect(ReactDOM.findDOMNode(draggedBookmark).classList).toContain('dragged');
            });
        });
    });

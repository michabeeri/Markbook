define(['react', 'reactDOM', 'constants', 'components/bookmarkList/bookmark'],
    function (React, ReactDOM, Constants, Bookmark) {
        'use strict';

        var TestUtils = React.addons.TestUtils;

        fdescribe('Bookmark', function () {

            var bookmark,
                draggedBookmark,
                bookmarkData,
                setDragged;

            beforeEach(function () {
                bookmarkData = {
                        title: 'Fargo Season 2',
                        date: new Date(2015, 10, 18)
                    };
                setDragged = jasmine.createSpy('setDragged');
                bookmark = TestUtils.renderIntoDocument(<Bookmark bookmarkData={bookmarkData}
                                                                  layout={Constants.layoutType.GRID}
                                                                  dragStart={setDragged}
                                                                  dataId='bm001'/>);
                jasmine.clock().install();
            });

            afterEach(function() {
                jasmine.clock().uninstall();
            });

            it('should render title in h1 tag', function () {
                expect(TestUtils.findRenderedDOMComponentWithTag(bookmark, 'h1').textContent).toBe('Fargo Season 2');
            });

            it('should render formated date in h2 tag', function () {
                expect(TestUtils.findRenderedDOMComponentWithTag(bookmark, 'h2').textContent).toBe('11/18/2015');
            });

            it('should call dragstart callback when being dragged', function (done) {
                TestUtils.Simulate.dragStart(ReactDOM.findDOMNode(bookmark));
                jasmine.clock().tick(51);
                expect(setDragged).toHaveBeenCalledWith('bm001');
                done();
            });

        });
    });

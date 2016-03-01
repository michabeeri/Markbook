define(['lodash', 'react', 'constants', 'components/bookmarkList/bookmark', 'actionProviders/actions'],
    function (_, React, Constants, Bookmark, ActionProvider) {

        'use strict';

        return React.createClass({
            displayName: 'BookmarkList',
            getInitialState: function () {
                return {
                    dragged: null
                };
            },
            getFilteredBookmarks: function () {
                var filter = this.props.state.filter;

                function titleCondition(bm) {
                    return !filter || !filter.title || bm.title.indexOf(filter.title) !== -1;
                }

                function tagCondition() {
                    return !filter || !filter.tag;
                }

                return _.filter(this.props.state.bookmarks, function (bm) {
                    return titleCondition(bm) && tagCondition(bm);
                });
            },
            dragReorder: function (draggedOverId) {
                if (!this.state.dragged || this.state.dragged === draggedOverId) {
                    return;
                }
                this.props.dispatch(ActionProvider.dragReorder(this.state.dragged, draggedOverId, _.last(this.props.state.currentBookmarkPath)));
            },
            setDragged: function (draggedId) {
                if (this.state.dragged !== draggedId) {
                    this.setState({dragged: draggedId});
                }
            },
            render: function () {
                return (
                    <div className='bookmark-list-container grid'>
                        {_.map(this.getFilteredBookmarks(), function (bm) {
                            var dragged = false;
                            if (bm.id === this.state.dragged) {
                                dragged = true;
                            }

                            return (
                                <Bookmark
                                    key={bm.id}
                                    dataId={'bm' + bm.id}
                                    bookmarkData={bm}
                                    layout={this.props.layout}
                                    dispatch={this.props.dispatch}
                                    dragClass={dragged}
                                    dragStart={this.setDragged}
                                    dragOver={this.dragReorder}
                                    dragEnd={this.setDragged}
                                />);
                        }.bind(this))}
                    </div>
                );
            }
        });
    });

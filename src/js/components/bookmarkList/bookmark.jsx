define(['react', 'constants', 'mixins/draggable', 'actionProviders/actions', 'utils/bookmarksUtil', 'components/bookmarkList/bookmarkList'],
    function (React, Constants, draggable, ActionProvider, BookmarksUtil, BookmarkList) {

        'use strict';
        var Bookmark = React.createClass({
            mixins: [draggable],
            displayName: 'Bookmark',
            onView: function (evt) {
                window.open('http://www.google.com');
                evt.stopPropagation();
            },
            onOpen: function (evt) {
                if (this.isOpen()) {
                    this.props.dispatch(ActionProvider.navigateToPreviousGroup(
                        BookmarksUtil.getParent(this.props.state.bookmarks, this.props.bookmarkData.id).id));

                } else {
                    this.props.dispatch(ActionProvider.openBookmarkGroup(this.props.bookmarkData.id));

                }
                evt.stopPropagation();
            },
            onEdit: function (evt) {
                this.props.dispatch(ActionProvider.openBookmarkDataModal(this.props.bookmarkData.id));
                evt.stopPropagation();
            },
            onDelete: function (evt) {
                var id = this.props.bookmarkData.id;
                if (BookmarksUtil.isGroup(this.props.state.bookmarks, id)) {
                    this.props.dispatch(ActionProvider.openDeleteGroupModal(id));
                } else {
                    var parent = BookmarksUtil.getParent(this.props.state.bookmarks, id);
                    if (parent.children && parent.children.length === 1) {
                        this.props.dispatch(ActionProvider.openLastItemInGroupDelete(id));
                    } else {
                        this.props.dispatch(ActionProvider.removeBookmark(id));
                    }
                }

                evt.stopPropagation();
            },
            onSelect: function (evt) {
                this.props.dispatch(ActionProvider.toggleBookmarkSelection(this.props.bookmarkData.id, evt.shiftKey));
            },
            isGrid: function () {
                return this.props.layout === Constants.layoutType.GRID;
            },
            isGroup: function () {
                var children = this.props.bookmarkData.children;
                return children && children.length > 0;
            },
            isSelected: function () {
                return this.props.bookmarkData.selected;
            },
            isOpen: function () {
                return this.props.state.currentBookmarkPath.indexOf(this.props.bookmarkData.id) !== -1;
            },
            getClassString: function () {
                return 'bookmark-base' +
                    (this.isGrid() ? ' grid' : ' list') +
                    (this.isGroup() ? ' group' : ' hvr-curl-top-left leaf') +
                    (this.isSelected() ? ' selected' : '') +
                    (this.props.dragClass ? ' dragged' : '') +
                    (this.isGroup() && this.isGrid() ? ' stack' : '');
            },
            renderChildren: function () {
                if (this.isGrid() || !this.isGroup() || !this.isOpen()) {
                    return (<div></div>);
                }

                return (
                    <div className="bookmark-drill-down-spacer">
                        <BookmarkList dispatch={this.props.dispatch}
                                  state={this.props.state}
                                  rootId={this.props.bookmarkData.id}
                                  repeaterItem = {this.props.repeaterItem}
                                  layout={this.props.layout}/>
                    </div>
                );
            },
            render: function () {
                return (
                    <div className={this.getClassString()}
                         data-id={this.props.dataId}
                         onClick={this.onSelect}
                         onDoubleClick={this.isGroup() ? this.onOpen : this.onView}
                        {...this.getDragAttr()}>
                        <div className="bookmark-internal">
                            <span className='title-small'>{this.props.bookmarkData.title}</span>

                            <div>
                                <span className='title-small title-info'>{this.isGroup()
                                    ? this.props.bookmarkData.children.length + ' items inside'
                                    : this.props.bookmarkData.date.toLocaleDateString('en-US')}</span>

                                <ul className="btn-list">
                                    {this.isGroup()
                                        ? <li className="btn-list-item" ><a className="btn bookmark-btn" onClick={this.onOpen}><i className="fa fa-folder-open-o"></i></a></li>
                                        : <li className="btn-list-item" ><a className="btn bookmark-btn" onClick={this.onView}><i className="fa fa-link"></i></a></li>
                                    }

                                    <li className="btn-list-item" ><a className="btn bookmark-btn" onClick={this.onEdit}><i className="fa fa-pencil-square-o"></i></a></li>
                                    <li className="btn-list-item" ><a className="btn bookmark-btn" onClick={this.onDelete}><i className="fa fa-trash"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        {this.renderChildren()}
                    </div>);
            }
        });

        return Bookmark;
    });

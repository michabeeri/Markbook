define(['react', 'constants', 'mixins/draggable', 'actionProviders/actions'], function (React, Constants, draggable, ActionProvider) {

    'use strict';
    var Bookmark = React.createClass({
        mixins: [draggable],
        displayName: 'Bookmark',
        getInitialState: function () {
            return {isOpen: false};
        },
        onView: function () {
            window.open('http://www.google.com');
            evt.stopPropagation();
        },
        onOpen: function (evt) {
            if (this.isGrid()) {
                this.props.dispatch(ActionProvider.openBookmarkGroup(this.props.bookmarkData.id));

            } else {
                this.setState({isOpen: !this.state.isOpen} );

            }
            evt.stopPropagation();
        },
        onEdit: function () {
            this.props.dispatch(ActionProvider.editBookmark(this.props.bookmarkData.id));
            evt.stopPropagation();
        },
        onDelete: function () {
            this.props.dispatch(ActionProvider.removeBookmark(this.props.bookmarkData.id));
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
        getClassString: function () {
            return 'bookmark-base' +
                (this.isGrid() ? ' grid' : ' list') +
                (this.isGroup() ? ' group' : ' leaf') +
                (this.props.bookmarkData.selected ? ' selected' : '') +
                (this.props.dragClass ? ' dragged' : '');
        },
        renderChildren: function () {
            if (this.isGrid() || !this.isGroup() || !this.state.isOpen) {
                return (<ul></ul>);
            }

            return (
                <ul>
                    {_.map(this.props.bookmarkData.children, function (bm) {
                        return (
                            <li key={bm.id}><Bookmark
                                bookmarkData={bm}
                                layout={this.props.layout}
                                dispatch={this.props.dispatch}
                                dragClass={false}
                                dragStart={function () {}}
                                dragOver={function () {}}
                                dragEnd={function () {}}
                            /></li>);
                    }.bind(this))}
                </ul>
            );
        },
        render: function () {
            return (
                <div className={this.getClassString()}
                        data-id={this.props.dataId}
                        draggable='true'
                        onDragStart={this.onDragStart}
                        onDragEnd={this.onDragEnd}
                        onDragOver={this.onDragOver}
                        onClick={this.onSelect}
                        onDoubleClick={this.isGroup() ? this.onOpen : this.onView}>

                    <div>
                        <h1 className='title-small'>{this.props.bookmarkData.title}</h1>

                        <h2 className='title-small footer'>{this.isGroup()
                            ? this.props.bookmarkData.children.length + ' items inside'
                            : this.props.bookmarkData.date.toLocaleDateString('en-US')}</h2>

                        {this.isGroup()
                            ? <button onClick={this.onOpen}>{'Open'}</button>
                            : <button onClick={this.onView}>{'View'}</button>
                        }

                        <button onClick={this.onEdit}>{'Edit'}</button>
                        <button onClick={this.onDelete}>{'Delete'}</button>
                    </div>
                    {this.renderChildren()}
                </div>);
        }
    });

    return Bookmark;
});

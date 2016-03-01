define(['react', 'constants'], function (React, Constants) {
    'use strict';
    return React.createClass({
        displayName: 'Bookmark',
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
                (this.isSelected() ? ' selected' : '') +
                (this.isGrid() ? ' grid' : ' list') +
                (this.isGroup() ? ' group' : ' leaf');
        },
        render: function () {
            return (
                <div className={this.getClassString()}
                     onClick={this.props.onSelect}
                     onDoubleClick={this.isGroup() ? this.props.onOpen : this.props.onView}>

                    <h1 className='title-small'>{this.props.bookmarkData.title}</h1>

                    <h2 className='title-small footer'>{this.isGroup()
                        ? this.props.bookmarkData.children.length + ' items inside'
                        : this.props.bookmarkData.date.toLocaleDateString('en-US')}</h2>

                    {this.isGroup()
                        ? <button onClick={this.props.onOpen}>{'Open'}</button>
                        : <button onClick={this.props.onView}>{'View'}</button>
                    }

                    <button onClick={this.props.onEdit}>{'Edit'}</button>
                    <button onClick={this.props.onDelete}>{'Delete'}</button>
                </div>
            );
        }
    });
});

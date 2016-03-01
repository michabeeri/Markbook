define(['lodash',
        'react',
        'actionProviders/actions',
        'constants',
        'utils/bookmarksUtil'],
    function (_, React, ActionProvider, Constants, BookmarksUtil) {
        'use strict';
        return React.createClass({
            displayName: 'BreadCrumbs',
            onItemClick: function (id) {
                this.props.dispatch(ActionProvider.navigateToPreviousGroup(id));
            },
            renderItem: function (item) {
                var onClick = BookmarksUtil.isCurrentGroup(this.props.currentPath, item.id) ?
                    null : this.onItemClick.bind(this, item.id);

                var itemData = BookmarksUtil.getBookmarkById(this.props.bookmarks, item.id);
                return <span className='title-small group-item' onClick={onClick}>{itemData.title}</span>;
            },
            renderFoldedItem: function (item) {
                return <span
                    className='title-small group-item'
                    onClick={this.onItemClick.bind(this, item.id)}>...</span>;
            },
            isPathOnChildGroupLevel: function () {
                return this.isPathLevelDeeperThan(0);
            },
            shouldFoldParentItems: function () {
                return this.isPathLevelDeeperThan(2);
            },
            isPathLevelDeeperThan: function (level) {
                var itemsWithoutRoot = this.props.currentPath.slice(1);
                return itemsWithoutRoot.length > level;
            },
            render: function () {
                var path = this.props.currentPath,
                    foldedItem = null,
                    parentItem = null,
                    currentItem = null;

                var rootItem = this.renderItem(path[0]);

                if (this.isPathOnChildGroupLevel()) {
                    var parentItemData = path[path.length - 2];
                    if (parentItemData.id !== Constants.ROOT_GROUP_ID) {
                        parentItem = this.renderItem(parentItemData);
                    }
                    currentItem = this.renderItem(path[path.length - 1]);
                }

                if (this.shouldFoldParentItems()) {
                    foldedItem = this.renderFoldedItem(path[path.length - 3]);
                }

                return (
                    <nav className="groups-item-container box">
                        {rootItem}
                        {foldedItem}
                        {parentItem}
                        {currentItem}
                    </nav>
                );
            }
        });
    });

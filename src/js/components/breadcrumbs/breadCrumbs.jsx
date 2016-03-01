define(['lodash',
        'react',
        'actionProviders/actions'],
    function (_, React, ActionProvider) {
        'use strict';
        return React.createClass({
            displayName: 'BreadCrumbs',
            onItemClick: function (id) {
                this.props.dispatch(ActionProvider.navigateToPreviousGroup(id));
            },
            renderItem: function (item) {
                return <span
                    className='title-small group-item'
                    onClick={this.onItemClick.bind(this, item.id)}>{item.title}</span>;
            },
            isPathOnChildGroupLevel: function () {
                return this.isPathLevelDeeperThan(1);
            },
            shouldFoldParentItems: function () {
                return this.isPathLevelDeeperThan(2);
            },
            isPathLevelDeeperThan: function (level) {
                var itemsWithoutRoot = this.props.items.slice(1);
                return itemsWithoutRoot.length >= level;
            },
            render: function () {
                var items = this.props.items,
                    foldedItem = null,
                    parentItem = null,
                    currentItem = null;

                var rootItem = this.renderItem(items[0]);

                if (this.isPathOnChildGroupLevel()) {
                    var parentItemData = items[items.length - 2];
                    if (parentItemData.id !== 'root') {
                        parentItem = this.renderItem(parentItemData);
                    }
                    currentItem = this.renderItem(items[items.length - 1]);
                }

                if (this.shouldFoldParentItems()) {
                    var foldedItemData = {
                        id: this.props.items[this.props.items.length - 3].id,
                        title: '...'
                    };
                    foldedItem = this.renderItem(foldedItemData);
                }

                return (
                    <nav className="box">
                        {rootItem}
                        {foldedItem}
                        {parentItem}
                        {currentItem}
                    </nav>
                );
            }
        });
    });

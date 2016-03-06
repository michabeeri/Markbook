define(['lodash',
        'react',
        'actionProviders/actions',
        'constants',
        'utils/bookmarksUtil',
        'utils/breadCrumbsUtil'
    ],
    function (_, React, actionProvider, constants, bookmarksUtil, breadCrumbsUtil) {
        'use strict';

        var FOLD_THRESHOLD = 3;
        var FOLD_SYMBOL = '...';

        function foldItemsIfNeeded(path, items) {
            if (path.length > FOLD_THRESHOLD) {
                items.splice(1, items.length - (FOLD_THRESHOLD + 1));
                items[items.length - FOLD_THRESHOLD].title = FOLD_SYMBOL;
            }

            return items;
        }

        return React.createClass({
            displayName: 'BreadCrumbs',
            propTypes: {
                dispatch: React.PropTypes.func.isRequired,
                currentPath: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
                bookmarks: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
            },
            onItemClick: function (id) {
                this.props.dispatch(actionProvider.navigateToPreviousGroup(id));
            },
            renderItem: function (item) {
                var onClick = bookmarksUtil.isCurrentGroup(this.props.currentPath, item.id) ?
                    undefined : this.onItemClick.bind(this, item.id);

                return <span className='title-small group-item contained' onClick={onClick} key={item.id}>{item.title}</span>;
            },
            render: function () {
                var path = this.props.currentPath;
                var items = breadCrumbsUtil.getItemsData(path, this.props.bookmarks);
                items = foldItemsIfNeeded(path, items);

                return (
                    <nav className="app-line-container groups-item-container box">
                        {_.map(items, this.renderItem)}
                    </nav>
                );
            }
        });
    }
)
;

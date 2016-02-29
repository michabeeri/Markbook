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
                    className='title-small'
                    onClick={this.onItemClick.bind(this, item.id)} key={item.id}>{item.title + ' > '}</span>;
            },
            render: function () {
                return (
                    <nav>
                        {_.map(this.props.items, this.renderItem)}
                    </nav>
                );
            }
        });
    });

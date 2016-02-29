define(['lodash',
        'react',
        'actionProviders/actions'],
    function (_, React, ActionProvider) {
        'use strict';
        return React.createClass({
            displayName: 'BreadCrumbs',
            onItemClick: function () {
                this.props.dispatch(ActionProvider.navigateToPreviousGroup());
            },
            renderItem: function (item, key) {
                return <span
                    className='title-small'
                    onClick={this.onItemClick} key={key}>{item}</span>;
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

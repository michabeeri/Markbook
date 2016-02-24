define(['lodash', 'react'], function (_, React) {
    'use strict';
    return React.createClass({
        displayName: 'BreadCrumbs',
        renderItem: function (item) {
            return <span>{item}</span>;
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

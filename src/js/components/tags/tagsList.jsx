define(['React', 'lodash', 'components/tags/tag'], function (React, _, Tag) {
    'use strict';

    return React.createClass({
        propTypes: {
            tags: React.PropTypes.array.isRequired,
            removeTag: React.PropTypes.func.isRequired
        },
        render: function () {
            var self = this;
            return (
                <ul ref="list"
                    className="style-less-list horizontal-list">{_.map(this.props.tags, function (tag, index) {
                    return <li className="list-item" key={index}>
                        <Tag tag={tag} removeTag={self.props.removeTag}/>
                    </li>;
                })}</ul>
            );
        }
    });
});

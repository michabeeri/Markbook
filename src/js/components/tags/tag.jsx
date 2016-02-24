define(['React'], function (React) {
    'use strict';

    return React.createClass({
        displayName: 'Tag',
        propTypes: {
            tag: React.PropTypes.string.isRequired,
            removeTag: React.PropTypes.func.isRequired

        },
        onClick: function () {
            this.props.removeTag(this.props.tag);
        },
        render: function () {
            return (
                <div className = 'tag'>
                    <span ref="title">{this.props.tag}</span>
                    <button ref="removeBtn" onClick={this.onClick}>x</button>
                </div>
            );
        }
    });
});

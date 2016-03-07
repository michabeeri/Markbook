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
                <span className="tag" tabIndex="0">
                    <span ref="title">{this.props.tag}</span>
                    <button ref="removeBtn" onClick={this.onClick} className="btn-style-less">
                        <i className="fa fa-times"></i>
                    </button>
                </span>
            );
        }
    });
});

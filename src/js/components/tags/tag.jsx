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
                <span className="tag scrollable-area" tabIndex="0">
                    <span ref="title" className="scrollable-area">{this.props.tag}</span>
                    <button ref="removeBtn" onClick={this.onClick} className="btn-style-less scrollable-area">
                        <i className="fa fa-times scrollable-area"></i>
                    </button>
                </span>
            );
        }
    });
});

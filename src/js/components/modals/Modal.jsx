define(['react'],
    function (React) {
        'use strict';

        return React.createClass({
            displayName: 'Modal',
            propTypes: {
                className: React.PropTypes.string,
                onClose: React.PropTypes.func,
                children: React.PropTypes.node.isRequired
            },
            close: function () {
                document.body.style.overflow = null;
                this.props.onClose();
            },
            render: function () {
                return (
                    <div className={this.props.className}>
                        <div>
                            <i className='fa fa-times modalCloser' id='modalCloser' onClick={this.close}></i>
                            {this.props.children}
                        </div>
                    </div>
                );
            }
        });
    }
);

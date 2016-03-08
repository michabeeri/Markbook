define(['react'],
    function (React) {
        'use strict';

        return React.createClass({
            displayName: 'Overlay',
            propTypes: {
                children: React.PropTypes.node.isRequired
            },
            preventAllInteractions: function (event) {
                event.stopPropagation();
                event.preventDefault();
            },
            render: function () {
                return (
                    <div className='overlay fixed-center' onClick={this.preventAllInteractions}
                         onScroll={this.preventAllInteractions} onWheel={this.preventAllInteractions}>
                        {this.props.children}
                    </div>
                );
            }
        });
    }
);

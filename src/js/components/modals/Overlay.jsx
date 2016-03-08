define(['react'],
    function (React) {
        'use strict';

        return React.createClass({
            displayName: 'Overlay',
            preventAllInteractions: function (event) {
                event.stopPropagation();
                event.preventDefault();
            },
            render: function () {
                return (
                    <div className='overlay' onClick={this.preventAllInteractions}
                         onScroll={this.preventAllInteractions} onWheel={this.preventAllInteractions}>
                    </div>
                );
            }
        });
    }
);

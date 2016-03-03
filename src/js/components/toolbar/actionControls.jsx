define(['react', 'constants'],
    function (React, Constants) {
        'use strict';

        return React.createClass({
            displayName: 'ActionControls',
            getInitialState: function () {
                return {
                    inSelectAllMode: false
                };
            },
            propTypes: {
                onSelectAll: React.PropTypes.func.isRequired,
                totalSelected: React.PropTypes.number.isRequired,
                layoutType: React.PropTypes.string.isRequired
            },
            OnSelectAll: function () {
                var inSelectAllMode = !this.state.inSelectAllMode;
                this.setState({inSelectAllMode: inSelectAllMode});
            },
            calcBtnClassName: function () {
                if (this.state.inSelectAllMode) {
                    return 'btn btn-disabled edit';
                }
                return 'btn';
            },
            calcLayoutClassName: function () {
                return 'fa fa-' + (this.props.layoutType === Constants.layoutType.GRID ? 'list' : 'th');
            },
            render: function () {
                return (
                    <div className='action-controls btn-group contained inline'>
                        <button className='btn select-all'
                                onClick={this.OnSelectAll}>{this.state.inSelectAllMode ? 'Deselect All' : 'Select All'}</button>
                        <button className={this.calcBtnClassName() + ' edit'} disabled={this.props.totalSelected !== 1}>Edit</button>
                        <button className={this.calcBtnClassName() + ' delete'} disabled={this.props.totalSelected === 0}>Delete</button>
                        <button className='btn view-type' onClick={this.props.switchLayout}><i className={this.calcLayoutClassName()}></i></button>
                    </div>
                );
            }
        });
    });

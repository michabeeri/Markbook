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
                layoutType: React.PropTypes.string.isRequired,
                switchLayout: React.PropTypes.func.isRequired,
                minGridLayoutExceeded: React.PropTypes.bool.isRequired
            },
            OnSelectAll: function () {
                var inSelectAllMode = !this.state.inSelectAllMode;
                this.setState({inSelectAllMode: inSelectAllMode});
            },
            calcBtnClassName: function (isDisabled) {
                if (isDisabled) {
                    return 'btn btn-disabled edit';
                }
                return 'btn';
            },
            calcLayoutClassName: function () {
                return 'fa fa-' + (this.props.layoutType === Constants.layoutType.GRID ? 'list' : 'th');
            },
            render: function () {
                var editDisabled = this.props.totalSelected !== 1;
                var deleteDisabled = this.props.totalSelected === 0;
                return (
                    <div className='action-controls btn-group contained inline'>
                        <button className='btn select-all'
                                onClick={this.OnSelectAll}>{this.state.inSelectAllMode ? 'Deselect All' : 'Select All'}</button>
                        <button className={this.calcBtnClassName(editDisabled) + ' edit'} disabled={editDisabled}>Edit
                        </button>
                        <button className={this.calcBtnClassName(deleteDisabled) + ' delete'} disabled={deleteDisabled}>
                            Delete
                        </button>
                        <button className={'btn layout' + (this.props.minGridLayoutExceeded ? ' hidden' : '')}
                                onClick={this.props.switchLayout}><i className={this.calcLayoutClassName()}></i>
                        </button>
                    </div>
                );
            }
        });
    });

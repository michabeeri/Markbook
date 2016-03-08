define(['react', 'constants'],
    function (React, Constants) {
        'use strict';

        return React.createClass({
            displayName: 'ActionControls',
            propTypes: {
                onSelectDeselectAll: React.PropTypes.func.isRequired,
                totalSelected: React.PropTypes.number.isRequired,
                isAllSelected: React.PropTypes.bool.isRequired,
                layoutType: React.PropTypes.string.isRequired,
                switchLayout: React.PropTypes.func.isRequired,
                minGridLayoutExceeded: React.PropTypes.bool.isRequired,
                onEdit: React.PropTypes.func.isRequired
            },
            onSelectDeselectAll: function () {
                this.props.onSelectDeselectAll(!this.props.isAllSelected);
            },
            calcBtnClassName: function (isDisabled) {
                if (isDisabled) {
                    return 'btn btn-disabled';
                }
                return 'btn';
            },
            calcLayoutClassName: function () {
                return 'fa fa-' + (this.props.layoutType === Constants.layoutType.GRID ? 'list' : 'th');
            },
            render: function () {
                var editDisabled = this.props.totalSelected !== 1;
                var deleteDisabled = this.props.totalSelected === 0;
                var selectDeselectIsHidden = this.props.layoutType === Constants.layoutType.LIST;
                return (
                    <div className='action-controls btn-group contained inline'>
                        <button className={'btn select-deselect-all' + (selectDeselectIsHidden ? ' hidden' : '')}
                                onClick={this.onSelectDeselectAll}>{this.props.isAllSelected ? 'Deselect All' : 'Select All'}</button>
                        <button className={this.calcBtnClassName(editDisabled) + ' edit'} disabled={editDisabled}
                                onClick={this.props.onEdit}>Edit
                        </button>
                        <button className={this.calcBtnClassName(deleteDisabled) + ' delete'} disabled={deleteDisabled} onClick={this.props.onDelete}>
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

define(['lodash', 'react', 'uuid'],
    function (_, React, uuid) {
        'use strict';

        return React.createClass({
            displayName: 'OrderBy',
            propTypes: {
                setSortType: React.PropTypes.func.isRequired,
                sortTypes: React.PropTypes.object.isRequired,
                selectedSortType: React.PropTypes.string.isRequired,
                hiddenSortType: React.PropTypes.string.isRequired
            },
            onSelectOrderBy: function (event) {
                this.props.setSortType(event.target.value);
            },
            renderOption: function (type) {
                var sortType = this.props.sortTypes[type];
                return <option key={uuid.v4()} value={sortType.value}
                               hidden={type === this.props.hiddenSortType}>{sortType.description}</option>;
            },
            render: function () {
                var renderOption = this.renderOption;
                return (
                    <div className='inline'>
                        <span>Reorder: </span>
                        <select className='order-by' onChange={this.onSelectOrderBy}
                                value={this.props.selectedSortType}>
                            {_.map(_.keys(this.props.sortTypes), function (type) {
                                return renderOption(type);
                            })}
                        </select>
                    </div>
                );
            }
        });

    });

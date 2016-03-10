define(['react'],
    function (React) {
        'use strict';

        return React.createClass({
            displayName: 'FilterResultsTitle',
            propTypes: {
                filterTerm: React.PropTypes.string.isRequired,
                filterType: React.PropTypes.string.isRequired,
                totalResults: React.PropTypes.number.isRequired,
                resetFilter: React.PropTypes.func.isRequired
            },
            onClick: function () {
                this.props.resetFilter();
            },
            render: function () {
                var totalResults = this.props.totalResults;
                return (
                    <div className='app-line-container'>
                        <button className='btn btn-border contained clr-fltr' onClick={this.onClick}>Clear Filter</button>
                        <span className='title-small contained'>Found {totalResults} match{totalResults === 1 ? '' : 'es'} for
                            <span className='search-term'> {this.props.filterTerm}</span> ({this.props.filterType}):</span>
                    </div>
                );
            }
        });

    });

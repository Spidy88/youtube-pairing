import React from 'react'
import PropTypes from 'prop-types'

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ''
        };
    }

    componentDidMount() {
        this.queryInput.focus();
    }

    handleQueryChange(e) {
        this.setState({ query: e.target.value });
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.notifyOnSearch();
        }
    }

    notifyOnSearch() {
        this.props.onSearch(this.state.query);
    }

    render() {
        const { disabled } = this.props;
        const { query } = this.state;

        return (
            <div className="input-group">
                <input
                    name="query"
                    className="form-control"
                    type="text"
                    placeholder="Search YouTube videos"
                    ref={(input) => { this.queryInput = input }}
                    value={query}
                    readOnly={disabled}
                    onChange={this.handleQueryChange.bind(this)}
                    onKeyPress={this.handleKeyPress.bind(this)}
                />

                <div className="input-group-append">
                    <button
                        className="btn btn-primary"
                        type="button"
                        disabled={disabled}
                        onClick={this.notifyOnSearch.bind(this)}>
                        Search
                    </button>
                </div>
            </div>
        )
    }
}

SearchBar.propTypes = {
    disabled: PropTypes.bool,
    onSearch: PropTypes.func.isRequired
};

SearchBar.defaultProps = {
    diabled: false
};

export default SearchBar
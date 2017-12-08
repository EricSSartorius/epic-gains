import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Searchbar extends PureComponent {
  render() {
    return (
      <div className="searchbar panel">
        <input
          className="input"
          type="text"
          value={this.props.search}
          onChange={this.props.updateSearch}
          placeholder="Find Exercise"
        />
      </div>
    );
  }
}

Searchbar.propTypes = {
  search: PropTypes.string.isRequired,
  updateSearch: PropTypes.func.isRequired,
};

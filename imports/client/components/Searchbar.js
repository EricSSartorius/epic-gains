import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Searchbar extends PureComponent {
  render() {
    return (
      <div className="searchbar">
        <input
          type="text"
          value={this.props.search}
          onChange={this.props.updateSearch}
          placeholder="Find Workout"
        />
      </div>
    );
  }
}

Searchbar.propTypes = {
  search: PropTypes.string.isRequired,
  updateSearch: PropTypes.func.isRequired,
};

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Searchbar extends PureComponent {
  render() {
    return (
      <div className="searchbar panel">
        <button onClick={this.props.randomize}>Randomize</button>
        <select
          className="input"
          value={this.props.filter}
          onChange={this.props.updateFilter}
        >
          <option value="All">All</option>
          <option value="Whole Body">Whole Body</option>
          <option value="Upper Body">Upper Body</option>
          <option value="Lower Body">Lower Body</option>
          <option value="Core">Core</option>
          <option value="Stretching">Stretching</option>
        </select>
        {/* <input
          className="input"
          type="text"
          value={this.props.search}
          onChange={this.props.updateSearch}
          placeholder="Find Exercise"
        /> */}
      </div>
    );
  }
}

Searchbar.propTypes = {
  filter: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
  Randomize: PropTypes.func.isRequired,
  updateFilter: PropTypes.func.isRequired,
  updateSearch: PropTypes.func.isRequired,
};

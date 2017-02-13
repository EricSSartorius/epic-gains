import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { autobind } from 'core-decorators';

@autobind
export default class Searchbar extends Component {
  render() {
    return (
      <div className="searchbar">
        <input type="text"
          value={this.props.search}
          onChange={this.props.updateSearch}
          placeholder="Find Workout"
        />
      </div>
    )
  }
}

Searchbar.propTypes = {

};

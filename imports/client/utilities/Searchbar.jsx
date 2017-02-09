import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { autobind } from 'core-decorators';

@autobind
export default class Searchbar extends Component {
  render() {
    return (
      <div>
        <p>Find Workout</p>
        <input type="text"
          value={this.props.search}
          onChange={this.props.updateSearch}/>
      </div>
    )
  }
}

Searchbar.propTypes = {

};

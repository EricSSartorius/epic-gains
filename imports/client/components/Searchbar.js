import React, { PureComponent } from 'react';

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

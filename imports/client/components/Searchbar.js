import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

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

}

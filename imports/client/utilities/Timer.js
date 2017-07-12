import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import PropTypes from 'prop-types'

class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      restElapsed: 0,
      secondsElapsed: 0,
      laps: [],
      lastClearedIncrementer: 0,
      rest: 15
    }
  }

  formattedSeconds = (sec) => {
    var seconds = ('0' + sec % 60).slice(-2)
    var minutes = Math.floor(sec / 60)

    return minutes + ":" + seconds
  }

  handleLapClick() {
    this.setState({ laps: this.state.laps.concat([this.state.secondsElapsed])})
  }

  handleResetClick() {
      this.setState({ secondsElapsed: 0, laps: [] })
  }

  handleStartClick() {
    var _this = this

    this.incrementer = setInterval(function () {
      _this.setState({
        secondsElapsed: (_this.state.secondsElapsed + 1)
      })
    }, 1000)
  }

  handleStopClick() {
    clearInterval(this.incrementer)
    this.setState({lastClearedIncrementer: this.incrementer})
  }

  render() {
    return <div className="stopwatch">


      {(this.state.secondsElapsed < 45 || this.state.secondsElapsed >= 60)
        ? <h1 className="stopwatch-timer">{this.formattedSeconds(this.state.secondsElapsed)}</h1>
        : <h1 className="stopwatch-timer">{this.formattedSeconds(this.state.restElapsed)}</h1>
      }

      {(this.state.secondsElapsed === 0 || this.incrementer === this.state.lastClearedIncrementer)
        ? <button className="btn start-btn" type="button" onClick={this.handleStartClick}>start</button>
        : <button className="btn stop-btn" type="button" onClick={this.handleStopClick}>stop</button>
      }

      {(this.state.secondsElapsed !== 0 && this.incrementer !== this.state.lastClearedIncrementer)
        ? <button className="btn" type="button" onClick={this.handleLapClick}>lap</button>
        : null
      }

      {(this.state.secondsElapsed !== 0 && this.incrementer === this.state.lastClearedIncrementer)
        ? <button className="btn" type="button" onClick={this.handleResetClick}>reset</button>
        : null
      }

      <ul className="stopwatch-laps">{this.state.laps.map(function (lap, i) {
        return <li><strong>{i + 1}</strong>/ {this.formattedSeconds(lap)}</li>
      })}
      </ul>
    </div>
  }
}

Timer.propTypes = {
  currentUser: PropTypes.object,
}

export default createContainer(({params}) => {
  let userSub = Meteor.subscribe('currentUser')
  return {
    currentUser: Meteor.user(),
    ready: userSub.ready(),
  }
}, Timer)


var button = React.createClass({
  render: function () {
    return <button type="button" {...this.props} className={"btn " + this.props.className} />
  }
})

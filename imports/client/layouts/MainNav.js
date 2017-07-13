import React, { Component } from 'react'
import { Link } from 'react-router'
import AccountsUIWrapper from '../utilities/AccountsUIWrapper'

const MainNav = () =>
  <nav className="main-nav">
    {/* {Meteor.userId() ? ( */}
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/workouts'>Workouts</Link></li>
        <li><Link to='/exercises'>Exercises</Link></li>
        <li><Link to='/timer'>Timer</Link></li>
        {/* <li><Link to='/library'>Library</Link></li> */}
        {/* <li><Link to='/teams'>Teams</Link></li> */}
        {/* <li><Link to='/settings'>Settings</Link></li> */}
        <li><AccountsUIWrapper /></li>
      </ul>
    {/* ) : (
      <ul>
        <li>
          <AccountsUIWrapper />
        </li>
      </ul>
    )} */}
  </nav>

export default MainNav

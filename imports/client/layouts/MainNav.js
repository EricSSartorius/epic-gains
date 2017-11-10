/* eslint jsx-a11y/anchor-is-valid: 0 */
import React from 'react';
import { Link } from 'react-router-dom';
import AccountsUIWrapper from '../utilities/AccountsUIWrapper';

const MainNav = () =>
  (
    <nav className="main-nav">
      {/* {Meteor.userId() ? ( */}
      <ul>
        <li><Link to="/">Workouts</Link></li>
        <li><Link to="/settings">Settings</Link></li>
        <li><AccountsUIWrapper /></li>
      </ul>
    </nav>
  );

export default MainNav;

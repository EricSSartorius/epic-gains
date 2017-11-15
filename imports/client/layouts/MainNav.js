/* eslint jsx-a11y/anchor-is-valid: 0 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import AccountsUIWrapper from '../utilities/AccountsUIWrapper';

const MainNav = () =>
  (
    <header>
      <Link to="/">Epic Gains</Link>
      <nav className="main-nav">
        <ul>
          {Meteor.userId() && <li><Link to="/settings">Settings</Link></li>}
          <li><AccountsUIWrapper /></li>
        </ul>
      </nav>
    </header>
  );

export default MainNav;

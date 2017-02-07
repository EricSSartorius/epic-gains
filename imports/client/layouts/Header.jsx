import React, { Component } from 'react';
import { Link } from 'react-router';

import AccountsUIWrapper from '../utilities/AccountsUIWrapper';

const Header = () =>
  <header>
    <nav>
      <Link to='/'>Home</Link>
      <Link to='/workout'>Workouts</Link>
      <Link to='/exercise'>Exercises</Link>
      <Link to='/timer'>Timer</Link>
      {/* <Link to='/library'>Library</Link> */}
    </nav>
    <AccountsUIWrapper />
  </header>

export default Header;

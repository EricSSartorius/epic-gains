import React from 'react';
import {
  Router,
  Route,
  IndexRoute,
  browserHistory
 } from 'react-router';
import { render } from 'react-dom';

import MainLayout from './layouts/MainLayout';
import App from './App'
import ExerciseForm from './pages/ExerciseForm';
import NotFound from './pages/NotFound';
import Timer from './pages/Timer';
import WorkoutForm from './pages/WorkoutForm';

Meteor.startup(() => {
  render(
    <Router history={browserHistory}>
      <Route path='/' component={MainLayout}>
        <IndexRoute component={App} />
        <Route path='/workout' component={WorkoutForm} />
        <Route path='/exercise' component={ExerciseForm} />
        <Route path='/timer' component={Timer} />
        <Route path='*' component={NotFound} />
      </Route>
    </Router>,
    document.getElementById('render-target')
  );
});

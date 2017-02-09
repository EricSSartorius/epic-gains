import React from 'react';
import {
  Router,
  Route,
  IndexRoute,
  browserHistory
 } from 'react-router';
import { render } from 'react-dom';

import MainLayout from './layouts/MainLayout';
import App from './App';
import WorkoutPage from './pages/WorkoutPage';
import ExerciseForm from './pages/ExerciseForm';
import Timer from './pages/Timer';
import Library from './pages/Library';
import NotFound from './pages/NotFound';

Meteor.startup(() => {
  render(
    <Router history={browserHistory}>
      <Route path="/" component={MainLayout}>
        <IndexRoute component={App} />
        <Route path='/workout' component={WorkoutPage} >
          <Route path='/workout/:workoutId' component={WorkoutPage} />
        </Route>
        <Route path='/exercise' component={ExerciseForm}>
          <Route path='/exercise/:exerciseId' component={ExerciseForm} />
        </Route>
        <Route path='/timer' component={Timer}>
          <Route path='/timer/:workoutId/:exerciseId' component={Timer} />
        </Route>
        <Route path='/library' component={Library}>
          <Route path='/library/:workoutId/:exerciseId' component={Library} />
        </Route>
        <Route path='*' component={NotFound} />
      </Route>
    </Router>,
    document.getElementById('render-target')
  );
});

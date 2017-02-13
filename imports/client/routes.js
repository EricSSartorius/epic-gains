import React from 'react';
import {
  Router,
  Route,
  IndexRoute,
  browserHistory
 } from 'react-router';
import { render } from 'react-dom';

import MainLayout from './layouts/MainLayout';
// import HomeLayout from './layouts/HomeLayout';
import App from './App';
import WorkoutPage from './pages/WorkoutPage';
import ExercisePage from './pages/ExercisePage';
import TimerPage from './pages/TimerPage';
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
        <Route path='/exercise' component={ExercisePage}>
          <Route path='/exercise/:exerciseId' component={ExercisePage} />
        </Route>
        <Route path='/timer' component={TimerPage}>
          <Route path='/timer/:workoutId/:exerciseId' component={TimerPage} />
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

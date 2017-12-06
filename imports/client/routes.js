import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { render } from 'react-dom';
import ScrollToTop from './utilities/ScrollToTop';
import MainNav from './layouts/MainNav';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';
import WorkoutPage from './pages/WorkoutPage';

Meteor.startup(() => {
  render(
    <Router>
      <ScrollToTop>
        <MainNav />
        <main className="main-layout">
          <Switch>
            <Route exact path="/" component={WorkoutPage} />
            <Route path="/workouts/:workoutId" component={WorkoutPage} />
            <Route path="/settings" component={Settings} />
            <Route path="*" component={NotFound} />
          </Switch>
        </main>
      </ScrollToTop>
    </Router>,
    document.getElementById('render-target'),
  );
});

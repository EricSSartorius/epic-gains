import React from 'react'
import {
  Router,
  Route,
  IndexRoute,
  browserHistory
 } from 'react-router'
import { render } from 'react-dom'

import MainLayout from './layouts/MainLayout'
import NotFound from './pages/NotFound'
import Settings from './pages/Settings'
import WorkoutPage from './pages/WorkoutPage'

Meteor.startup(() => {
  render(
    <Router history={browserHistory}>
      <Route path="/workouts" component={MainLayout}>
        <IndexRoute component={WorkoutPage} />
        <Route path='/workouts' component={WorkoutPage} >
          <Route path='/workouts/:workoutId' component={WorkoutPage} />
        </Route>
        <Route path='/settings' component={Settings}>
          <Route path='/settings/profile' component={Settings} />
          <Route path='/settings/account' component={Settings} />
        </Route>
        <Route path='*' component={NotFound} />
      </Route>
    </Router>,
    document.getElementById('render-target')
  )
})

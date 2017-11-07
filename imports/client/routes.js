import React from 'react'
import {
  Router,
  Route,
  IndexRoute,
  browserHistory
 } from 'react-router'
import { render } from 'react-dom'

import Dashboard from './pages/Dashboard'
import ExercisePage from './pages/ExercisePage'
import HomePage from './pages/HomePage'
// import Library from './pages/Library'
import MainLayout from './layouts/MainLayout'
import NotFound from './pages/NotFound'
import Settings from './pages/Settings'
// import Teams from './pages/Teams'
// import TimerPage from './pages/TimerPage'
import WorkoutPage from './pages/WorkoutPage'

Meteor.startup(() => {
  render(
    <Router history={browserHistory}>
      <Route path="/" component={MainLayout}>
        <IndexRoute component={Dashboard} />
        <Route path='/workouts' component={WorkoutPage} >
          <Route path='/workouts/:workoutId' component={WorkoutPage} />
        </Route>
        <Route path='/exercises' component={ExercisePage}>
          <Route path='/exercises/:exerciseId' component={ExercisePage} />
        </Route>
        {/* <Route path='/timer' component={TimerPage}>
          <Route path='/timer/:workoutId/:exerciseId' component={TimerPage} />
        </Route> */}
        {/* <Route path='/library' component={Library}>
          <Route path='/library/:workoutId/:exerciseId' component={Library} />
        </Route> */}
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

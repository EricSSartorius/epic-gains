/* eslint jsx-a11y/anchor-is-valid: 0 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SortableContainer, arrayMove } from 'react-sortable-hoc';

import WorkoutItem from '../components/WorkoutItem';

class WorkoutList extends PureComponent {
  render() {
    return (
      <div >
        {this.props.workouts.map((workout, index) => (
          <WorkoutItem key={`workout-${index}`} index={index} workout={workout} />
        ))}
      </div>
    );
  }
}

export default SortableContainer(WorkoutList);


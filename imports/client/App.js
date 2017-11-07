import React, { Component } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import IsRole from './utilities/IsRole'

class App extends Component {
  render() {
    if (!this.props.ready) {
      return <div> Loading </div>
    }

    return (
        <main>
          <IsRole role={['admin', 'voter']} {...this.props}>
            <button onClick={this.showAll}>
              Show {this.props.showAll ? 'One' : 'All'}
            </button>
          </IsRole>
          <form className="new-items" onSubmit={this.addItems}>
            <input type="text" ref='itemOne'/>
            <input type="text" ref='itemTwo'/>
            <button type="submit">Add Items</button>
          </form>
          <ReactCSSTransitionGroup
            transitionName='item'
            transitionEnterTimeout={600}
            transitionLeaveTimeout={600}
            transitionAppear>
            {this.props.items.map((item) => {
              return <Item item={item} key={item._id}/>
            })}
          </ReactCSSTransitionGroup>
        </main>
    )
  }
}

export default createContainer(({params}) => {
  let itemsSub = Meteor.subscribe('allItems')
  let userSub = Meteor.subscribe('currentUser')
  let showAll = Session.get('showAll')
  let itemsArray
  
  if(params.id) {
    itemsArray = Items.find({_id: params.id}).fetch()
  } else {
    itemsArray = Items.find({}, {
      limit: showAll ? 50 : 1,
      sort: { lastUpdated: 1 }
    }).fetch()
  }
  return {
    showAll,
    ready: itemsSub.ready() && userSub.ready(),
    items: itemsArray
  }
}, App)

import React, { Component } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from "react-tap-event-plugin"
import IsRole from './utilities/IsRole'

injectTapEventPlugin() // required by material ui

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
    );
  }
}

export default createContainer(({params}) => {
  let itemsSub = Meteor.subscribe('allItems')
  let userSub = Meteor.subscribe('currentUser')
  let showAll = Session.get('showAll')
  let itemsArray
  const muiTheme = getMuiTheme({
    // palette: {
    //   primary1Color: colorPalette.black,
    //   primary2Color: colorPalette.cyan,
    //   primary3Color: colorPalette.lightGrey,
    //   accent1Color: colorPalette.purple,
    //   accent2Color: '#fafafa',
    //   textColor: colorPalette.black,
    //   secondaryTextColor: colorPalette.darkGrey,
    //   alternateTextColor: colorPalette.darkGrey,
    //   canvasColor: colorPalette.white,
    //   accent3Color: colorPalette.lightGrey,
    //   disabledColor: '#bbbbbb',
    //   pickerHeaderColor: colorPalette.cyan,
    //   borderColor: colorPalette.lightGrey,
    //   shadowColor: colorPalette.darkGrey,
    // },
    appBar: {
      height: 50,
      color: colorPalette.white
    },
    button: {
      height: 28,
      minWidth: 120
    }
  })
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

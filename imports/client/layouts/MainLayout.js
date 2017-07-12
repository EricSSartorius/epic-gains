import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from "react-tap-event-plugin"
import MainNav from './MainNav'
import Footer from './Footer'

injectTapEventPlugin() // required by material ui

const MainLayout = ({children}) =>
  <div>
    <header>
      <MainNav />
    </header>
    <main className="main-layout">
      {children}
    </main>
    <Footer />
  </div>

export default MainLayout

import React, {Component} from "react";
import {AppRegistry} from 'react-native'
import {Provider} from 'react-redux'
import Navigation from './navigation/ScreenNavigaton'

import store from './redux/store'

class MyApp extends Component {
  render() {
    return(
        <Provider store = {store}>
          <Navigation />
        </Provider>
    )
  }
}

export default MyApp

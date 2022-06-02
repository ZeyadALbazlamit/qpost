import React from 'react'

import {createAppContainer, createStackNavigator} from 'react-navigation'

import BreakingNews from '../screens/BreakingNews'
import ArticleDetailScreen from '../screens/ArticleDetailScreen'
import SplashScreen from '../screens/SplashScreen'
import VideoScreen from '../screens/VideoScreen'
import SectionScreen from '../screens/SectionScreen'
import TestScreen from '../screens/test/TestScreen'
import HTMLDemo from '../screens/test/HTMLDemo'
import BottomTab from './HomeTabNavigaton'
import WebView from '../screens/WebView'

import TransitionConfiguration from './TransitionConfiguration'

export default createAppContainer(
  createStackNavigator(
    {
      SplashScreen: SplashScreen,
      BreakingNews: BreakingNews,
      ArticleDetailScreen: ArticleDetailScreen,
      VideoScreen: VideoScreen,
      SectionScreen: SectionScreen,
      TestScreen: TestScreen,
      HTMLDemo: HTMLDemo,
      WebView: WebView,
      
      BottomTab: BottomTab,
    },
    {
      // initialRouteName: 'TestScreen',
      initialRouteName: 'SplashScreen',
      headerMode: 'none',
      transitionConfig: TransitionConfiguration,

      index: 1,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    
  )
)

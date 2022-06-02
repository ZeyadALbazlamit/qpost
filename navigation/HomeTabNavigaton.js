import React from "react";
import {
  HomePage,
  BookMarkScreenPage,
  OpinionCategoryPage,
  SectionMenuPage,
  SettingPage,
  SearchPage,
} from '../screens/Main'

import TransitionConfiguration from './TransitionConfiguration'

import ArticleDetailScreen from '../screens/ArticleDetailScreen'
import SectionScreen from '../screens/SectionScreen'
import VideoScreen from '../screens/VideoScreen'
import ContactUs from '../screens/ContactUs'

import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import constants from '../constants';
import CustomBottomBar from "../screens/CustomBottomBar";


const HomeStack = createStackNavigator(
  {
    HomePage: HomePage,
    ArticleDetailScreen : ArticleDetailScreen,
    VideoScreen : VideoScreen,
    SectionScreen : SectionScreen,
  },
  {
    initialRouteName: 'HomePage',
    headerMode: 'none',
    transitionConfig: TransitionConfiguration,
  }
)

const BookMarkStack = createStackNavigator(
  {
    BookMarkScreenPage : BookMarkScreenPage,
    ArticleDetailScreen : ArticleDetailScreen,
  },
  {
    initialRouteName: 'BookMarkScreenPage',
    headerMode: 'none',
    transitionConfig: TransitionConfiguration,
  }
)

const OpinionCategoryStack = createStackNavigator(
  {
    OpinionCategoryPage : OpinionCategoryPage,
    ArticleDetailScreen : ArticleDetailScreen,
  },
  {
    initialRouteName: 'OpinionCategoryPage',
    headerMode: 'none',
    transitionConfig: TransitionConfiguration,
  }
)

const SearchStack = createStackNavigator(
  {
    SearchPage : SearchPage,
    ArticleDetailScreen : ArticleDetailScreen,
  },
  {
    initialRouteName: 'SearchPage',
    headerMode: 'none',
    transitionConfig: TransitionConfiguration,
  }
)

const SectionMenuStack = createStackNavigator(
  {
    SectionMenuPage : SectionMenuPage,
    ArticleDetailScreen : ArticleDetailScreen,
    SectionScreen : SectionScreen,
  },
  {
    initialRouteName: 'SectionMenuPage',
    headerMode: 'none',
    transitionConfig: TransitionConfiguration,
  }
)

const SettingStack = createStackNavigator(
  {
    SettingPage : SettingPage,
    ContactUs : ContactUs,
  },
  {
    initialRouteName: 'SettingPage',
    headerMode: 'none',
    transitionConfig: TransitionConfiguration,
  }
)

const TabNavigator = createBottomTabNavigator(
  {
    
    الرئيسية: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: 'الرئيسية',
        tabBarIcon: ({tintColor}) => <FontAwesome name="home" size={21} color={tintColor} />,
      },
    }, // HomeScreen
    
    القائمة: {
      screen: SectionMenuStack,
      navigationOptions: {
        tabBarLabel: 'القائمة',
        tabBarIcon: ({tintColor}) => <FontAwesome name="align-right" size={21} color={tintColor} />,
      },
    }, // Sections menu
    
    البحث: {
      screen: SearchStack,
      navigationOptions: {
        tabBarLabel: 'البحث',
        tabBarIcon: ({tintColor}) => <FontAwesome name="search" size={21} color={tintColor} />,
      },
    }, // Search

    المفضلة: {
      screen: BookMarkStack,
      navigationOptions: {
        tabBarLabel: 'المفضلة',
        tabBarIcon: ({tintColor}) => <FontAwesome name="briefcase" size={21} color={tintColor} />,
      },
    }, // book mark
    
    المزيد: {
      screen: SettingStack,
      navigationOptions: {
        tabBarLabel: 'المزيد',
        tabBarIcon: ({tintColor}) => <Entypo name="dots-three-horizontal" style = {{marginBottom: -3,}} size={21} color={tintColor} />,
      },
    }, // settings
  },
  {
    initialRouteName: 'الرئيسية',
    tabBarComponent: CustomBottomBar,
    transitionConfig: TransitionConfiguration,
    tabBarOptions: {
      activeTintColor: 'orange',
      inactiveTintColor: constants.Colors.grayDark,
    },
    navigationOptions: {
      gesturesEnabled: false
    },
    resetOnBlur: true,
    // lazy: true,
  }
);

export default TabNavigator;

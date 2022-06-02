import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'

import NetInfo from '@react-native-community/netinfo'
import AsyncStorage from '@react-native-community/async-storage';
import { createBottomTabNavigator, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';

import LottieView from 'lottie-react-native'
import firebase from 'react-native-firebase'
let Analytics = firebase.analytics()

import Api from '../components/utils/Api'
import OneSignal from 'react-native-onesignal';

import { connect } from 'react-redux';
import { insertCategoryData, networkState, updateBookMarkIds, getSectionData, setNotificationPermission } from '../redux/action/index';

export class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    OneSignal.init("a97830fa-fb7d-4144-9408-dc8de3f780fe"); //OneSignal key configure
    OneSignal.configure(); 	// triggers the ids event
    OneSignal.addEventListener('received', this.onReceived); //OneSignal eventlistener setting expect openResult
    OneSignal.addEventListener('ids', this.onIds);
    // Analytics.setAnalyticsCollectionEnabled(false); //Firebase analytics enable or disable
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {

  }

  onIds(device) {

  }
  componentDidMount() {
    OneSignal.inFocusDisplaying(0);
    this.loadingData()
  }

  async loadingData() {
    try{
      await this.getNetWorkState()      
      await this.getCategoryData()
      await this.getBookMarData()
      await this.getSectionMenu()
      const resetAction = StackActions.reset({      //React-Navigation reset after loading data, fix issue that go back to splash screen
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: "BottomTab",
          })
        ]
      });
      this.props.navigation.dispatch(resetAction);
    }
    catch(error){
      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: "BottomTab",
          })
        ]
      });
      this.props.navigation.dispatch(resetAction);
    }
  }

  async getBookMarData() {
    const bookMarkIds = await AsyncStorage.getItem('BookMarkIds')           //Get bookmark array from AsyncStorage
    bookMarkIds && this.props.updateBookMarkIds(JSON.parse(bookMarkIds))
    const permissionNotification = await AsyncStorage.getItem('permission')
    permissionNotification ?                                                //Check push notification is setted: if it is first running after app install
      this.props.setNotificationPermission(permissionNotification)
      :
      await AsyncStorage.setItem('permission', '1') && this.props.setNotificationPermission('1')
  }

  async getSectionMenu() {
    const sectionMenu = await Api.getSectionMenuData()                      //Get all section(category) array data
    this.props.getSectionData(sectionMenu.data)
  }

  async getCategoryData() {
    let categoryIdOrder = [593,7,2,844,17]                                  //Origin category orders array
    const postsArray = categoryIdOrder.map( async(item) => {
      const postData = await Api.getPostDataFromCategory(item)
      const category = await Api.getCategoryfromId(item)
      return {
        name: category.data.name,
        slug: category.data.slug,
        id: category.data.id,
        description: category.data.description,
        posts: postData.data
      }
    })
    categoryData = await Promise.all(postsArray)                            //Get section article data for each section
    this.props.insertCategoryData(categoryData)
  }

  async getNetWorkState() {
    const netState = await NetInfo.isConnected.fetch()                      //Network connection status checking
    this.props.networkState(netState)
  }

  render() {
    return (
      <View style = {styles.container}>
        <View style = {{flex: 1, width: '100%'}}>
          <LottieView
            source = {require('../assets/SplashAnimation.json')}
            autoPlay = {true}
            loop = {false}
            resizeMode="cover"
          />
        </View>
        <View style = {styles.loadingIndicatorView}>
          <ActivityIndicator size = 'large' color = '#FF8500' />
        </View>
        <View style = {styles.splashDescriptionView}>
          <Text style = {styles.splashTitle}>مرحبا بكم</Text>
          <Text style = {styles.splashText}>جميع الحقوق محفوظة © 2019</Text>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
	return {
		themState: state.dataReducer.themState,
	}
}

const mapDispatchToProps = dispatch => ({
  insertCategoryData: (data) => dispatch(insertCategoryData(data)),
  networkState: (data) => dispatch(networkState(data)),
  updateBookMarkIds: (data) => dispatch(updateBookMarkIds(data)),
  getSectionData: (data) => dispatch(getSectionData(data)),
  setNotificationPermission: (data) => dispatch(setNotificationPermission(data)),
});
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(SplashScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center'
  },
  splashDescriptionView: {
    height: 100,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  loadingIndicatorView: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
  },
  splashTitle: {
		color: 'black', 
		fontSize: 20,
		fontFamily: 'Cairo-Bold',
  },
  splashText: {
		color: 'black', 
		fontSize: 15,
		fontFamily: 'Cairo-SemiBold',
	},
})
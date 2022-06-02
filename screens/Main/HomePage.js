
// node node_modules/react-native/local-cli/cli.js bundle --entry-file='index.js' --bundle-output='./ios/main.jsbundle' --dev=false --platform='ios' --assets-dest='./ios'

import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
  ActivityIndicator,
  RefreshControl,
  Platform,
} from 'react-native'

import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo'
import OneSignal from 'react-native-onesignal';

import {
  Container,
  CustomStyle,
} from '../../components/Setting'
import SafariView from 'react-native-safari-view';
import constants from '../../constants';

import { connect } from 'react-redux';
import Api from '../../components/utils/Api'
import 
{ 
  insertCategoryData, 
  updateBookMarkIds, 
  networkState, 
  getSectionData,
  setNotificationPermission, 
} from '../../redux/action/index';

import CarouselComponent from '../component/Carousel'
import CustomSwipeList from '../component/SwipeList'


export class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
      loadmore: false,
      netError: false
    }
    OneSignal.addEventListener('opened', this.onOpened);
  }

  onOpened = (openResult) => {
    console.log('notificaiton', openResult)
    this.props.navigation.navigate({
      // 'BreakingNews', 
      // {postID: openResult.notification.payload.additionalData.postid}
      routeName: 'BreakingNews',
      params: {postID: openResult.notification.payload.additionalData.postid},
      key: openResult.notification.payload.additionalData.postid 
    })
  }

   pullingData = async() => {
    try{
      const netState = await NetInfo.isConnected.fetch()
      this.props.networkState(netState)
      let categoryIdOrder = [593,7,2,844,17]  // initial 5 orders
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
      categoryData = await Promise.all(postsArray)
      this.props.insertCategoryData(categoryData)
      const bookMarkIds = await AsyncStorage.getItem('BookMarkIds')
      bookMarkIds && this.props.updateBookMarkIds(JSON.parse(bookMarkIds))
      const sectionMenu = await Api.getSectionMenuData()
      this.props.getSectionData(sectionMenu.data)
      this.setState({netError: false})
      this.setState({refresh: false})
    }
    catch(err){
      this.setState({refresh: false})
      this.setState({netError: true})
    }
  }

  componentDidMount() {
    (!this.props.netState) && this.setState({netError: true})
    this.props.permission === '0' ? OneSignal.setSubscription(false) : OneSignal.setSubscription(true)      //AsyncStorage -> redux store value -> OneSignal nick name 
  }

  fullToRefresh = () => {
    this.setState({refresh: true})
    this.pullingData()                  //Pull to refresh
  }

  toWebView(url) {
    this.props.navigation.navigate('WebView', {url: url})
  }

  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {      //checkig if scroll view reached at the bottom of screen
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  loadMoreCategory = async() => {
    //Load more data once scroll view reached at the bottom of screen
    try{
      if(!this.state.netError && this.props.categoryData.length < 10 && !this.state.loadmore) {
        const categoryIdOrder = [6,6694,16,43,19,18,968,26];          //same process in splash screen loading initial data
        this.setState({loadmore: true})
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
        const addData = await Promise.all(postsArray)
        const categoryData = this.props.categoryData
        categoryData.push(...addData)
        this.props.insertCategoryData(categoryData)
        this.setState({categoryIdOrder: []})
        this.setState({loadmore: false})
      }
    }
    catch(err){

    }
  }

  render() {
    const {themState, categoryData} = this.props
    const { netError, loadmore} = this.state
    return (
      <Container isWhiteTheme={themState}>
        <ScrollView 
          style = {{width: '100%'}}
          refreshControl = {
            <RefreshControl 
              onRefresh = {this.fullToRefresh.bind(this) }
              style={{backgroundColor: 'transparent'}}
              refreshing = {this.state.refresh}
            />
          }
          onScroll={({nativeEvent}) => {
            if (this.isCloseToBottom(nativeEvent)) {
              this.loadMoreCategory()
            }
          }}
          scrollEventThrottle={400}
        >
          <View style = {styles.headerContainer}>
            <Text style = {themState ? CustomStyle.headerTitle : {...CustomStyle.headerTitle, color: 'white'}}>الرئيسية</Text>
            <TouchableOpacity 
              style = {{flexDirection: 'row', alignItems: 'center'}}
              onPress = {() => this.props.navigation.navigate('VideoScreen')}
            >
              <Image source = {constants.Images.LOGO} style = {{marginLeft: 8}} />
            </TouchableOpacity>
          </View>
          {
            netError &&
            <View style = {styles.errorView}>
              <Text style = {{fontFamily: 'Cairo-SemiBold', fontSize: 12, textAlign: 'center', color: 'white'}}>عذرا ، ليس هناك اتصال بالإنترنت</Text>
            </View>
          }
          {
            categoryData.map((item, index) => {
              return(
                <View key = {index}>
                  {
                    index > 0 &&
                    <TouchableOpacity 
                      onPress = {() => this.props.navigation.navigate('SectionScreen', {
                          id: item.id,
                          title: item.name
                        })}
                      style = {styles.lastReportView}
                    >
                      <Text style = {themState ? {...styles.subHeaderTitle, fontSize: 20} : {...styles.subHeaderTitle, fontSize: 20, color: 'white'}}>{item.name}</Text>
                    </TouchableOpacity>
                  }
                  <CarouselComponent carouselData = {item.posts.slice(0,4)} typeOfCarousel = {'home'} navigation = {this.props.navigation}  />
                  <CustomSwipeList swipeData = {item.posts.slice(4,8)} navigation = {this.props.navigation} />
                </View>
              )
            })
          }
          <View style = {styles.loadMoreView}>
            {
              loadmore && <ActivityIndicator size = 'large' color = '#FF5800' />
            }
          </View>
          <View style = {styles.subScriptionWrapper}>
            <View style = {styles.subScriptionView}>
              <Text style = {{fontSize: 16, fontFamily: 'Cairo-SemiBold', color: constants.Colors.textBookmarkBlack}}>اشترك الآن في القائمة البريدية</Text>
              <TouchableOpacity 
                onPress={() => this.toWebView('http://eepurl.com/dy3Qtf')}
                style = {styles.subScriptionButton}
              >
                <Text style = {{fontFamily: 'Cairo-Bold', fontSize: 16, color: 'white'}}>إشترك</Text>
              </TouchableOpacity>
              <Text style = {{fontSize: 15, fontFamily: 'Cairo-SemiBold', color: constants.Colors.textBookmarkBlack, textAlign: 'center'}}>
                 واحصل على أفضل المواضيع من كيوبوست على بريدك الإلكتروني        
              </Text>
            </View>
          </View>
        </ScrollView>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
	return {
    themState: state.dataReducer.themState,
    categoryData: state.dataReducer.categoryData,
    netState: state.dataReducer.netState,
    bookmark: state.dataReducer.bookmark,
    permission: state.dataReducer.permission,
	}
}

const mapDispatchToProps = dispatch => ({
  insertCategoryData: (data) => dispatch(insertCategoryData(data)),
  updateBookMarkIds: (data) => dispatch(updateBookMarkIds(data)),
  networkState: (data) => dispatch(networkState(data)),
  getSectionData: (data) => dispatch(getSectionData(data)),
  setNotificationPermission: (data) => dispatch(setNotificationPermission(data)),
});
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(HomePage);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
	headerContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 28,
    marginTop: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18
  },
  lastReportView: {
    width: '100%',
    paddingHorizontal: 30,
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingVertical: 15,
  },
  subScriptionView: {
    borderRadius: 8,
    borderColor: '#DEDEDE',
    borderWidth: 1,
    paddingTop: 20,
    paddingBottom: 14,
    flexDirection: 'column',
    width: '100%',
    paddingHorizontal: 39,
    alignItems: 'center',
  },
  subScriptionButton: {
    width: '100%',
    backgroundColor: '#F5A623',
    borderRadius: 22.5,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  subScriptionWrapper: {
    width: '100%',
    paddingHorizontal: 28,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 30
  },
  loadMoreView: {
    flexDirection: 'column',
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorView: {
    width: '100%',
    height: 33,
    backgroundColor: '#FF5800',
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subHeaderTitle: {
    fontSize: 15,
		fontFamily: 'Cairo-Bold', 
		writingDirection: 'rtl',
		color: '#FF5800'
  }
})
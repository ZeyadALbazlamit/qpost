import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native'

import {
  Container,
  CustomStyle,
} from '../components/Setting'

import AsyncStorage from '@react-native-community/async-storage';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import constants from '../constants';
const {width, height} = Dimensions.get('window')

import { connect } from 'react-redux';
import { updateBookMarkIds } from '../redux/action/index';
import Api from '../components/utils/Api';
import CarouselComponet from './component/Carousel'

export class VideoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postData: [],
      pages: 1,
      loading: true,
      loadmore: false,
    }
  }

  componentDidMount() {
    this.loadingData()
  }

  async loadingData() {
    const videos = await Api.getVideoSection(this.state.pages)
    var addedData = this.state.postData
    addedData.push(...videos.data)
    this.setState({postData: addedData},(() => {
      this.setState({loading: false})
    }))
  }
  

  async loadMoreArticle() {
    this.setState({loadmore: true})
    const numberOfPage = this.state.pages + 1
    this.setState({pages: numberOfPage},
      async() => {
      const data = await Api.getVideoSection(this.state.pages)
      var addedData = this.state.postData
      addedData.push(...data.data)
      await this.setState({postData: addedData})
      this.setState({loadmore: false})
    })
  }

  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };
  

  async bookmarkProcess(data, id) {
    try{
      const bookMarkIds = this.props.bookmark
      const filtered = bookMarkIds.includes(id)
        ? bookMarkIds.filter(element => element !== id)
        : [...bookMarkIds ,id];
      this.props.updateBookMarkIds(filtered)
      await AsyncStorage.setItem('BookMarkIds', JSON.stringify(filtered))
      this.setState({loading: false})
      const rowRef = data[id]
      setTimeout(() => {
        rowRef.closeRow()
      }, 100);
    }
    catch (err){
      
    }
  }


  _renderSwipeBookingList(data) {
    const {themState} = this.props
    return(
      <SwipeListView
        data={data}
        keyExtractor = {(item) => item.id.toString()}
        renderItem={ ({item}) => {
          const postDate = [new Date(item.modified_gmt).getMonth(), new Date(item.modified_gmt).getDate(),new Date(item.modified_gmt).getDay()]
          return(
          <TouchableOpacity 
            activeOpacity = {1}
            style = {themState ? CustomStyle.sectionWrapper: {...CustomStyle.sectionWrapper, backgroundColor: constants.Colors.grayDark2}}
            onPress = {() => this.props.navigation.navigate('ArticleDetailScreen', {postID: item.id, imageURI: item.image,})}
          >
            <View 
              style = {themState ? styles.sectionContainer 
                : {...styles.sectionContainer, backgroundColor: constants.Colors.grayDark2, borderBottomColor: constants.Colors.dividerDarkColor }}
            >
              <View style = {CustomStyle.avartarWrapper}>
                <Image source = {{uri: `${item.image}`}} style = {CustomStyle.articleAvatar} resizeMode = 'cover' />
                {
                  this.props.bookmark.includes(item.id) && 
                  <Image source = {constants.Images.BOOKMARKICON} style = {CustomStyle.bookMarkfloat} />
                }
              </View>
              <View style = {CustomStyle.articleTitleView}>
                <Text style = {themState ? CustomStyle.descriptionBoldText : {...CustomStyle.descriptionBoldText, color: 'white'}} numberOfLines = {2}>{item.title}</Text>
                <Text style = {CustomStyle.descriptionText} numberOfLines = {1}>{`${constants.Arabic.dayOfWeek[postDate[2]]}, ${postDate[1]}, ${constants.Arabic.months[postDate[0]]}`}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}}
        renderHiddenItem={ (data, rowMap) => {
          return(
            <View style={themState ? CustomStyle.rowBack : {...CustomStyle.rowBack, backgroundColor: constants.Colors.grayDark2}}>
              <TouchableOpacity 
                style={
                  this.props.bookmark.includes(data.item.id) ?
                  {...CustomStyle.backRightBtn, backgroundColor: '#F5A623'}
                  : {...CustomStyle.backRightBtn}
                } 
                onPress = {() => this.bookmarkProcess(rowMap, data.item.id)}
              >
                <Image source={constants.Images.WHITECHECKEDICON} />
              </TouchableOpacity>
            </View>
          )
        }}
        rightOpenValue={-120}
      />
    )
  }

  render() {
    const {themState} = this.props
    const {loading, loadmore, postData} = this.state
    return (
      <Container isWhiteTheme={themState}>
      {
        loading ? 
        <View style = {{width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color = '#FF5800' size = 'large' />
        </View>
        :
        <ScrollView 
          style = {{width: '100%', flexGrow: 1}}
          onScroll={({nativeEvent}) => {
            if (this.isCloseToBottom(nativeEvent)) {
              this.loadMoreArticle()
            }
          }}
          scrollEventThrottle={400}
        >
          <View style = {styles.topBar}>
            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress = {() => this.props.navigation.pop()} style = {{marginRight: 12}}>
                <FontAwesome name={'angle-right'} size={40} color={themState ? 'black' : 'white'} />
              </TouchableOpacity>
              <Text style = {themState ? CustomStyle.headerTitle : {...CustomStyle.headerTitle, color: 'white'}}>فيديو</Text>
            </View>
            <Entypo name = 'folder-video' size = {36} color = 'red' />
          </View>
          <TouchableOpacity 
            onPress = {() => this.props.navigation.navigate('ArticleDetailScreen', {
              postID: postData[0].id,
              imageURI: postData[0].image,
            })}
          >
            <Image source = {{uri: postData[0].image}} style = {{...styles.imageContainer, overflow: 'hidden'}} />
          </TouchableOpacity>
          <View style = {{width: '100%', paddingTop: 5, paddingHorizontal: 28}}>
              <Text style = {themState ? CustomStyle.descriptionBoldText : {...CustomStyle.descriptionBoldText, color: 'white'}} numberOfLines = {2}>{postData[0].title}</Text>
            </View>
          {this._renderSwipeBookingList(this.state.postData.slice(1, this.state.postData.length))}
          <View style = {styles.loadMoreView}>
              {
                loadmore && <ActivityIndicator size = 'small' color = '#FF5800' />
              }
          </View>
        </ScrollView>
      }
      </Container>
    );
  }
}
function mapStateToProps(state) {
	return {
    themState: state.dataReducer.themState,
    bookmark: state.dataReducer.bookmark,
	}
}
const mapDispatchToProps = dispatch => ({
  updateBookMarkIds: (data) => dispatch(updateBookMarkIds(data)),
});
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(VideoScreen);

const styles = StyleSheet.create({
  topBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 47,
    marginBottom: 12,
    paddingHorizontal: 30,
  },
  imageContainer: {
    width: '100%', 
    height: height*0.36, 
    flexDirection: 'column',
    alignItems: 'flex-start', 
    justifyContent: 'center', 
    backgroundColor: 'transparent',
    position: 'relative',
  },
  sectionContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomColor: constants.Colors.dividerWeakColor,
    borderBottomWidth: 1,
    marginRight: 20,
  },
  loadMoreView: {
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 30
  },
  loadMoreButton: {
    borderRadius: 18,
    height: 36,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF8500',
  }
})
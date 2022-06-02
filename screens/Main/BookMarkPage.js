import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  ScrollView,
  Animated,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import {
  CustomStyle,
  Container,
} from '../../components/Setting'
import NetWorkError from '../component/NetworkErrorMessage';
import Api from '../../components/utils/Api'
import constants from '../../constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { SwipeListView } from 'react-native-swipe-list-view';
const {width} = Dimensions.get('window')
import HTML from 'react-native-render-html';

import { connect } from 'react-redux';
import { updateBookMarkIds } from '../../redux/action/index';

 const duration = 2500

export class BookMarkPage extends React.Component {
  constructor(props) {
    super(props);
    this.recWidth = new Animated.Value(0);
    this.iconScale = new Animated.Value(0);
  }
  state = {
    emptyBookMark: true,
    loading: true,
    bookmarkArticle: []
  }

  componentDidMount() {
    const {bookmark} = this.props
    bookmark.length > 0 && this.setState({emptyBookMark: false})
    this.loadingBookMarkData(bookmark)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.bookmark !== this.props.bookmark) {
      nextProps.bookmark.length > 0 && this.setState({emptyBookMark: false})
      this.loadingBookMarkData(nextProps.bookmark)
    }
  }

  async loadingBookMarkData(bookmark) {
    try{
      let bookmarkedData = []
      const dataArray = bookmark.map(async(item) => {
        let data = await Api.getArticleDetailFromId(item)
        return data.data
      })
      bookmarkedData = await Promise.all(dataArray)
      this.setState({bookmarkArticle: bookmarkedData})
      this.setState({loading: false})
    }
    catch{

    }
  }

  async bookmarkProcess(data,id) {
    try{
      const rowRef = data[id]
      rowRef.closeRow()
      const bookMarkIds = this.props.bookmark
      const filtered = bookMarkIds.filter(element => element !== id)
      this.props.updateBookMarkIds(filtered)
      await AsyncStorage.setItem('BookMarkIds', JSON.stringify(filtered))
    }
    catch (err){

    }
  }

  componentWillMount() {
    setTimeout(() => {
      Animated.loop(
        Animated.timing(this.recWidth, {
          toValue: 1,
          useNativeDriver: true,
          duration: duration
        }),
      ).start()
    }, 300)
  }

  _renderSwipeBookingList(data) {
    const themState = this.props.themState
    return(
      <SwipeListView
        data={data}
        keyExtractor = {(item) => item.id.toString()}
        renderItem={ ({item}) => {
          const postDate = [new Date(item.modified_gmt).getMonth(), new Date(item.modified_gmt).getDate(),new Date(item.modified_gmt).getDay()]
          return(
          <TouchableOpacity 
            style = {themState ? CustomStyle.sectionWrapper: {...CustomStyle.sectionWrapper, backgroundColor: constants.Colors.grayDark2}}
            onPress = {() => this.props.navigation.navigate('ArticleDetailScreen', {postID: item.id,imageURI: item.image,})}
            activeOpacity = { 1 }
          >
            <View 
              style = {themState ? styles.sectionContainer 
              : {...styles.sectionContainer, backgroundColor: constants.Colors.grayDark2, borderBottomColor: constants.Colors.dividerDarkColor }}
            >
              <View style = {CustomStyle.avartarWrapper}>
                <Image source = {{uri: `${item.image}`}} style = {CustomStyle.articleAvatar} resizeMode = 'cover' />
                <Image source = {constants.Images.BOOKMARKICON} style = {CustomStyle.bookMarkfloat} />
              </View>
              <View style = {styles.articleTitleView}>
                <Text style = {themState ? CustomStyle.descriptionBoldText : {...CustomStyle.descriptionBoldText, color: 'white'}} numberOfLines = {2}>
                  {
                    item.title.rendered
                    .replace(/<p>/g, '')
                    .replace(/&#(\d+);/g, (match, num) => String.fromCharCode(num))
                    .replace(/&#x([A-Za-z0-9]+);/g, (match, num) => String.fromCharCode(parseInt(num, 16)))
                    .replace(/&nbsp;/g, '')
                    .replace(/&gt;/g, '>')
                    .replace(/&lt;/g, '<')
                  }
                </Text>
                <Text style = {CustomStyle.descriptionText} numberOfLines = {1}>{`${constants.Arabic.dayOfWeek[postDate[2]]}, ${postDate[1]}, ${constants.Arabic.months[postDate[0]]}`}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}}
        renderHiddenItem={ (data, rowMap) => {
          return(
            <View style={themState ? CustomStyle.rowBack : {...CustomStyle.rowBack, backgroundColor: constants.Colors.grayDark2}}>
              <TouchableOpacity 
                style={{...CustomStyle.backRightBtn, backgroundColor: '#F5A623'}} 
                onPress = {() => this.bookmarkProcess(rowMap, data.item.id)}
              >
                <Image source={constants.Images.WHITECHECKEDICON}/>
              </TouchableOpacity>
            </View>
          )
        }}
        rightOpenValue={-120}
      />
    )
  }

  render() {
    const recAnimationX = this.recWidth.interpolate({
      inputRange: [0, 0.6, 1],
      outputRange: [55, -80, -80]
    })
    const scaleOfIcon = this.recWidth.interpolate({
      inputRange:   [0,   0.6, 0.8, 0.9,1],
      outputRange:  [0.5, 0.5, 2,   1,  1]
    })
    const {emptyBookMark, loading, bookmarkArticle} = this.state
    const {themState} = this.props
    return (
      <Container isWhiteTheme={themState}>
        <View style = {styles.headerContainer}>
          <TouchableOpacity style = {{marginRight: 12}}>
            <FontAwesome name={'angle-right'} size={40} color={themState ? 'black' : 'white'} />
          </TouchableOpacity>
          <Text style = {themState ? CustomStyle.headerTitle : {...CustomStyle.headerTitle, color: 'white'}}>المواد المفضلة</Text>
        </View>
        <NetWorkError />
        {
          emptyBookMark ?
          <ScrollView style = {{flexDirection: 'column', width: '100%', flex: 1,}}>
            <View style = {{width: '100%', alignItems: 'center', marginTop: 20}}>
              <Text style = {themState ? styles.emptyBookingTitle : {...styles.emptyBookingTitle, color: 'white'}}>لا توجد لديك مواد في المفضلة</Text>
            </View>
            <View style = {styles.emptyView}>
              <View style = {styles.emptyItemWrapper}>
                <View style = {themState ? {...styles.emptyItem} : {...styles.emptyItem, borderBottomColor: constants.Colors.dividerDarkColor}}>
                  <View style = {styles.emptyAvatar} />
                  <View style = {styles.emptyBarWrapper}>
                    <View style = {styles.emptyBar} />
                    <View style = {styles.emptyBar2} />
                  </View>
                </View>
              </View>
              <View style = {styles.emptyItemWrapper}>
                <Animated.View 
                  style = {[
                    styles.CheckFloatView, 
                    {
                      transform: [
                        {
                          translateX: recAnimationX
                        }
                      ]
                    }
                  ]}
                >
                  <Animated.View 
                    style = {[styles.checkedRectangle]}
                  >
                    <Animated.Image 
                      source = {constants.Images.WHITECHECKEDICON} 
                      style = {{
                        transform: [
                          {
                            scaleX: scaleOfIcon
                          },
                          {
                            scaleY: scaleOfIcon
                          }
                        ]
                      }} 
                    />
                  </Animated.View>
                  <View style = {themState ? {...styles.emptyItem} : {...styles.emptyItem, borderBottomColor: constants.Colors.dividerDarkColor}}>
                    <View style = {styles.emptyAvatar} />
                    <View style = {styles.emptyBarWrapper}>
                      <View style = {styles.emptyBar} />
                      <View style = {styles.emptyBar2} />
                    </View>
                  </View>
                </Animated.View>
              </View>
              <View style = {styles.emptyItemWrapper}>
                <View style = {themState ? {...styles.emptyItem} : {...styles.emptyItem, borderBottomColor: constants.Colors.dividerDarkColor}}>
                  <View style = {styles.emptyAvatar} />
                  <View style = {styles.emptyBarWrapper}>
                    <View style = {styles.emptyBar} />
                    <View style = {styles.emptyBar2} />
                  </View>
                </View>
              </View>
            </View>
            <View style = {{width: '100%', alignItems: 'center'}}>
              <View style = {{width: '70%', alignItems: 'center', marginTop: 10}}>
                <Text style = {themState ? {...styles.emptyBookingTitle, fontSize: 18} : {...styles.emptyBookingTitle, fontSize: 18, color: 'white'}}>{`قم باضافة المواد بتحريك الخانة ، الى اليسار و إضغط على إضافة`}</Text>
              </View>
            </View>
          </ScrollView>
          :loading ? 
            <View style = {styles.loadingView}>
              <ActivityIndicator size = 'large' color = '#FF5800' />
            </View>
            :
            <ScrollView style = {{width: '100%'}}>
              {this._renderSwipeBookingList(bookmarkArticle)}
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
	updateBookMarkIds: (data) => dispatch(updateBookMarkIds(data))
});
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(BookMarkPage);


const styles = StyleSheet.create({
	headerContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 30,
    marginTop: 47,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 21,
  },
  articleWrapper: {
    flexDirection: 'row-reverse',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: constants.Colors.dividerWeakColor
  },
  articleTitleView: {
    flexDirection:'column',
    flex: 1,
    justifyContent: 'flex-start',
  },
  articleAvatar: {
    width: 106,
    height: 82,
  },
  avartarWrapper: {
    borderWidth: 0,
    borderRadius: 8,
    borderTopLeftRadius: 0,
    width: 106,
    height: 82,
    marginRight: 17,
    overflow: 'hidden',
    position: 'relative',
  },
  videoMarkfloat: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  bookMarkfloat: {
    position: 'absolute',
    bottom: -1,
    left: -3,
  },
  emptyView: {
    flexDirection: 'column',
    width: '100%',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  emptyItemWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 117,
  },
  checkedRectangle: {
    height: 106,
    width: 106,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5A623'
  },
  emptyItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 31,
    height: 117,
    borderBottomWidth: 1,
    borderBottomColor: constants.Colors.dividerWeakColor
  },
  emptyAvatar: {
    width: 106,
    height: 82,
    backgroundColor: '#E9E9E7',
    borderRadius: 8,
    borderTopRightRadius: 0,
  },
  emptyBarWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 16,
    marginTop: 16
  },
  emptyBar: {
    width: width*0.39,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#E9E9E7',
  },
  emptyBar2: {
    width: width*0.25,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#E9E9E7',
    marginTop: 8
  },
  CheckFloatView: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 117,
		justifyContent: 'center',
		position: 'absolute',
    left: -50
  },
  emptyBookingTitle: {
    fontSize: 20,
    writingDirection: 'rtl',
    fontFamily: 'Cairo-SemiBold',
    color: constants.Colors.grayDark,
    textAlign: 'center'
  },
  loadingView: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  //Swiping List
  sectionContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: 19,
    borderBottomColor: constants.Colors.dividerWeakColor,
    borderBottomWidth: 1
  },
  articleTitleView: {
    flexDirection:'column',
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
})
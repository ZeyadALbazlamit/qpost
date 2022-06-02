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
  Platform,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Keyboard,
} from 'react-native'
import {
  CustomStyle,
  Container,
} from '../../components/Setting'

import AsyncStorage from '@react-native-community/async-storage';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import NetworkError from '../component/NetworkErrorMessage';
import constants from '../../constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const {width} = Dimensions.get('window')

import { connect } from 'react-redux';
import { changeStyle, updateBookMarkIds } from '../../redux/action/index';
import Api from '../../components/utils/Api';
import CustomSwipeList from '../component/SwipeList'

export class BookMarkPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      searchedData: [],
      loading: false,
      focused: false,
      page: 1,
      loadmore: false
    }
  }

  async searchPosts() {
    Keyboard.dismiss()
    this.setState({loading: true})
    const data = await Api.searchPostsByText(this.state.searchText, this.state.page)
    this.setState({searchedData: data.data})
    this.setState({loading: false})
  }

  cancelSearch() {
    this.setState({searchText: ''})
  }

  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 0;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  async loadMoreArticle() {
    this.setState({loadmore: true})
    const page = this.state.page + 1
    this.setState({page: page}, () => {
      Api.searchPostsByText(this.state.searchText, this.state.page)
      .then(data => {
        const originData = this.state.searchedData
        originData.push(...data.data)
        this.setState({loadmore: false})
        this.setState({searchedData: originData})
      })
      .catch(err => {
        this.setState({loadmore: false})
      })
    })
  }

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
    const {searchText, loading, searchedData, focused} = this.state
    return (
      <Container isWhiteTheme={themState}>
        <ScrollView 
          style = {{width: '100%', flexGrow: 1, marginTop: 20}}
          onScroll={({nativeEvent}) => {
            if (this.isCloseToBottom(nativeEvent)) {
              this.loadMoreArticle()
            }
          }}
          scrollEventThrottle={400}
        >
        <View style = {CustomStyle.headerContainer}>
          <View style = {{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity>
              <FontAwesome name={'angle-right'} size={40} color={themState ? 'black' : 'white'} style = {{marginRight: 12}} />
            </TouchableOpacity>
            <Text style = {themState ? CustomStyle.headerTitle : {...CustomStyle.headerTitle, color: 'white'}}>البحث</Text>
          </View>
          <TouchableOpacity>
            <Image source = {constants.Images.LOGO} />
          </TouchableOpacity>
        </View>
        <NetworkError />
        <View style = {{width: '100%', flexDirection: 'column', alignItems: 'center'}}>
          <View style = {styles.searchBarContainer}>
            <View style = {styles.searchBar}>
              <TouchableOpacity onPress = {() => this.searchPosts()}>
                <FontAwesome name = 'search' size = {18} style = {{marginRight: 12}} />
              </TouchableOpacity>
              <TextInput 
                style = {styles.searchInput} 
                placeholderTextColor={constants.Colors.textGray}
                value = {searchText}
                onChangeText = {(text) => this.setState({searchText: text})}
                onSubmitEditing = {() => this.searchPosts()}
                onFocus = {() => this.setState({focused: true})}
                onBlur = {() => this.setState({focused: false})}
              />
            </View>
            {
              !searchText == '' &&
              <TouchableOpacity onPress = {() => this.cancelSearch()}>
                <Text style = {{fontFamily: 'Cairo-Bold', fontSize: 15,color: themState ? constants.Colors.grayDark : 'white', marginLeft: 12}}>إلغاء</Text>
              </TouchableOpacity>
            }
          </View>
        </View>
        {
          loading ?
          <View style = {styles.loadingView}>
            <ActivityIndicator size = 'large' color = '#FF5800' />
          </View>
          :
          <View>
            <View style = {styles.searchResultView}>
              {this._renderSwipeBookingList(searchedData)}
            </View>
            {
              this.state.loadmore &&
              <View style = {styles.loadMoreView}>
                <ActivityIndicator color = '#FF5800' size = 'small' />
              </View>
            }
          </View>
        }
        </ScrollView>
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
  changeStyle: () => dispatch(changeStyle()),
  updateBookMarkIds: (data) => dispatch(updateBookMarkIds(data)),
});
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(BookMarkPage);


const styles = StyleSheet.create({
  searchResultView: {
    width: '100%',
    flexDirection: 'column',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  loadingView: {
    width: '100%',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    marginTop: 80,
    alignItems: 'center'
  },
  searchBarContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 13,
  },
  loadMoreView: {
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 30
  },
  searchBar: {
    flexDirection: 'row',
    height: 46,
    justifyContent: 'flex-start',
    flex: 1,
    alignItems: 'center',
    borderRadius: 23,
    borderWidth: 1,
    borderColor: '#F6F6F6',
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 12
  },
  searchInput: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 0,
    writingDirection: 'rtl',
    fontFamily: 'Cairo-Bold', 
    fontSize: 16,
    ...Platform.select({
      android: {
        fontWeight: 'normal'
      }
    }),
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
})
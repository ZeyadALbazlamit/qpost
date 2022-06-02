import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import AsyncStorage from '@react-native-community/async-storage';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

import {
  CustomStyle,
} from '../../components/Setting'
import constants from '../../constants';

import { connect } from 'react-redux';
import { updateBookMarkIds } from '../../redux/action/index';

export class SwipeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      swipeData: props.swipeData
    }
  }
  
  async bookmarkProcess(data, id) {
    try{
      const bookMarkIds = this.props.bookmark
      const filtered = bookMarkIds.includes(id)
        ? bookMarkIds.filter(element => element !== id)
        : [...bookMarkIds ,id];
      this.props.updateBookMarkIds(filtered)
      await AsyncStorage.setItem('BookMarkIds', JSON.stringify(filtered))
      const rowRef = data[id]
      setTimeout(() => {
        rowRef.closeRow()
      }, 100);
    }
    catch (err){
      
    }
  }
  
  navigateArticle(id, image) {
    this.props.navigation.navigate({
      // 'ArticleDetailScreen', 
      // {postID: id,imageURI: image,}
      routeName: 'ArticleDetailScreen',
      params: {postID: id,imageURI: image},
      key: id
    })
  }

  render() {
    const {themState} = this.props
    return (
      <SwipeListView
        data={this.state.swipeData}
        keyExtractor = {(item) => item.id.toString()}
        renderItem={ ({item}) => {
          const postDate = [new Date(item.modified_gmt).getMonth(), new Date(item.modified_gmt).getDate(),new Date(item.modified_gmt).getDay()]
          return(
          <TouchableOpacity 
            style = {themState ? CustomStyle.sectionWrapper: {...CustomStyle.sectionWrapper, backgroundColor: constants.Colors.grayDark2}}
            onPress = {() => this.navigateArticle(item.id,item.image,)}
            activeOpacity = { 1 }
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
                  <Image source={constants.Images.WHITECHECKEDICON}/>
              </TouchableOpacity>
            </View>
          )
        }}
        rightOpenValue={-120}
      />
    );
  }
}
const mapStateToProps = (state) => {
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
)(SwipeList);

const styles = StyleSheet.create({
  sectionContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: 19,
    borderBottomColor: constants.Colors.dividerWeakColor,
    borderBottomWidth: 1
  },
})
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Animated,
  TouchableHighlight,
} from 'react-native'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  Container,
  CustomStyle
} from '../../components/Setting'
import constants from '../../constants';
const {width} = Dimensions.get('window')

import { connect } from 'react-redux';
import { changeStyle } from '../../redux/action/index';

export class OpinionCategoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.rowSwipeAnimatedValues = {};
    this.state.articleSample.forEach((_, i) => {
      this.rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
    });
  }
  state = {
    entries: [
      {
        uri: constants.Images.ARTICLEAVATAR1,
        title: 'شؤون عربية',
        description: 'هذه نصيحة ترمب لـ"بوينغ" بشأن طائرتها 737 ماكس المنكوبة'
      },
      {
        uri: constants.Images.ARTICLEAVATAR2,
        title: 'شؤون عربية',
        description: 'هذه نصيحة ترمب لـ"بوينغ" بشأن طائرتها 737 ماكس المنكوبة'
      },
      {
        uri: constants.Images.ARTICLEAVATAR2,
        title: 'شؤون عربية',
        description: 'هذه نصيحة ترمب لـ"بوينغ" بشأن طائرتها 737 ماكس المنكوبة'
      },
    ],
    articleSample: [
      {
        description: 'هذه نصيحة ترمب لـ"بوينغ" بشأن     طائرتها 737 ماكس المنكوبة',
        avartar: constants.Images.ARTICLEAVATAR1,
        createAt: ' 19 ابريل 2019',
        video: false,
        bookMarked: false,
        key: '0'
      },
      {
        description: 'هذه نصيحة ترمب لـ"بوينغ" بشأن     طائرتها 737 ماكس المنكوبة',
        avartar: constants.Images.ARTICLEAVATAR2,
        createAt: '19 ابريل  2019',
        video: true,
        bookMarked: false,
        key: '1'
      },
    ],
  };

  onSwipeValueChange = (swipeData) => {
    const {key, value} = swipeData
    this.rowSwipeAnimatedValues[key].setValue(Math.abs(value))
  }

  bookmarkProcess(data, index) {
    let preState = this.state.articleSample
    preState[index].bookMarked = !preState[index].bookMarked
    this.setState({articleSample: preState})
    const rowRef = data[index]
    setTimeout(() => {
      rowRef.closeRow()
    }, 100);
  }

  _renderSwipeBookingList(data, themState) {
    return(
      <SwipeListView
        data={data}
        ItemSeparatorComponent = {() => (<View style = {themState ? {...CustomStyle.articleDivider} : {...CustomStyle.articleDivider, backgroundColor: constants.Colors.dividerDarkColor}} />)}
        renderItem={ ({item}) => (
          <TouchableHighlight style = {themState ? CustomStyle.sectionWrapper: {...CustomStyle.sectionWrapper, backgroundColor: constants.Colors.grayDark2}}
            onPress = {() => this.props.navigation.navigate('ArticleDetailScreen')}
          >
            <View style = {themState ? CustomStyle.sectionContainer : {...CustomStyle.sectionContainer, backgroundColor: constants.Colors.grayDark2 }}>
              <View style = {CustomStyle.articleTitleView}>
                <Text style = {themState ? CustomStyle.descriptionBoldText : {...CustomStyle.descriptionBoldText, color: 'white'}} numberOfLines = {2}>{item.description}</Text>
                <Text style = {CustomStyle.descriptionText} numberOfLines = {1}>{item.createAt}</Text>
              </View>
              <View style = {CustomStyle.avartarWrapper}>
                <Image source = {item.avartar} style = {CustomStyle.articleAvatar} resizeMode = 'cover' />
                {
                  item.video && <Image source = {constants.Images.VIDEOICON} style = {CustomStyle.videoMarkfloat} />
                }
                {
                  item.bookMarked && <Image source = {constants.Images.BOOKMARKICON} style = {CustomStyle.bookMarkfloat} />
                }
              </View>
            </View>
          </TouchableHighlight>
        )}
        renderHiddenItem={ (data, rowMap) => {
          return(
            <View style={themState ? CustomStyle.rowBack : {...CustomStyle.rowBack, backgroundColor: constants.Colors.grayDark2}}>
              <TouchableOpacity 
                style={data.item.bookMarked ? {...CustomStyle.backRightBtn, backgroundColor: '#F5A623'} : CustomStyle.backRightBtn} 
                onPress = {() => this.bookmarkProcess(rowMap, data.index)}
              >
                <Animated.View
                  style={[
                    CustomStyle.checkedIcon,
                    {
                      transform: [
                        {
                          scale: this.rowSwipeAnimatedValues[data.item.key].interpolate({
                            inputRange: [80, 110, 120],
                            outputRange: [0.5, 1.2, 1],
                            extrapolate: 'clamp',
                          }),
                        }
                      ],
                    }
                  ]}
                >
                  <Image source={constants.Images.WHITECHECKEDICON} style={CustomStyle.checkedIcon} />
                </Animated.View>
              </TouchableOpacity>
            </View>
          )
        }}
        rightOpenValue={-120}
        onSwipeValueChange={this.onSwipeValueChange}
      />
    )
  }

  _renderCarouselItem({item, index}) {
    return(
      <View style = {styles.carouselContainer}>
        <Image source = {item.uri} style = {{width: '100%', height: 322}} resizeMode = 'cover' />
        <View style = {styles.carouselDescription}>
          <Text style = {CustomStyle.carouselTitle} numberOfLines = {1}>{item.title}</Text>
          <Text style = {{color: 'white'}}>___</Text>
          <Text style = {CustomStyle.carouselText} numberOfLines = {2}>{item.description}</Text>
        </View>
      </View>
    )
  }


  render() {
    const {themState} = this.props
    return (
      <Container isWhiteTheme={themState}>
        <ScrollView style = {{width: '100%'}}>
          <View style = {styles.topBar}>
            <Text style = {themState ? CustomStyle.headerTitle : {...CustomStyle.headerTitle, color: 'white'}}>شؤون عربية</Text>
            <TouchableOpacity style = {{marginLeft: 12}}>
              <FontAwesome name={'angle-right'} size={40} color={themState ? 'black' : 'white'} />
            </TouchableOpacity>
          </View>
          <View style = {{marginBottom: 37}}>
            <Carousel 
              windowSize = {1}
              ref = {(c) => {this._carousel = c;}}
              data = {this.state.entries}
              renderItem = {this._renderCarouselItem}
              sliderWidth = {width}
              itemWidth = {width}
            />
          </View>
          {this._renderSwipeBookingList(this.state.articleSample, themState)}
        </ScrollView>
      </Container>
    );
  }
}
function mapStateToProps(state) {
	return {
		themState: state.dataReducer.themState,
	}
}

const mapDispatchToProps = dispatch => ({
	changeStyle: () => dispatch(changeStyle())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(OpinionCategoryPage);


const styles = StyleSheet.create({
  topBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 47,
    marginBottom: 23,
    paddingHorizontal: 30,
  },
  carouselContainer: {
    width: '100%', 
    height: 322, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: 'transparent',
    position: 'relative',
  },
  carouselDescription: {
    position: 'absolute',
    bottom: 31,
    right: 28,
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '70%',
  },
})
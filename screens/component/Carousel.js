import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native'

import {
  CustomStyle,
} from '../../components/Setting'
const {width, height} = Dimensions.get('window')
import { connect } from 'react-redux';
import Carousel, {Pagination} from 'react-native-snap-carousel'


export class CarouselComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  
  _renderHomeCarousel({item}) {
    return(
      <TouchableOpacity 
        onPress = {() => this.props.navigation.navigate('ArticleDetailScreen', {
          postID: item.id,
          imageURI: item.image,
        })}
        activeOpacity = {1}
      >
          <Image source = {{uri: `${item.image}`}} 
            style = {{...styles.lastPostsCarousel, overflow: 'hidden'}} 
            resizeMode = 'cover' 
          />
          <View style = {styles.carouselTitleView}>
            <Text 
              numberOfLines = {2}
              style = {{fontFamily: 'Cairo-Bold', fontSize: 18, paddingHorizontal: 8,writingDirection: 'rtl' ,color: this.props.themState ? '#1E2634' : 'white'}}
            >
              {item.title}
            </Text>
          </View>
      </TouchableOpacity>
    )
  }

  _renderSectionCarousel({item}) {
    return(
      
      <TouchableOpacity 
        onPress = {() => this.props.navigation.navigate('ArticleDetailScreen', {
          postID: item.id,
          imageURI: item.image,
        })}
        activeOpacity = {1}
      >
        <Image source = {{uri: `${item.image}`}} 
          style = {{...styles.carouselContainer, overflow: 'hidden'}} 
          resizeMode = 'cover' 
        />
        <View style = {styles.carouselTitleView}>
          <Text 
            numberOfLines = {2}
            style = {{fontFamily: 'Cairo-Bold', fontSize: 18, paddingHorizontal: 12,writingDirection: 'rtl' ,color: this.props.themState ? '#1E2634' : 'white'}}
          >
            {item.title}
          </Text>
        </View>
    </TouchableOpacity>
    )
  }

  render() {
    const {carouselData, typeOfCarousel} = this.props
    return (
      <View >
        {
          typeOfCarousel === 'home' 
          ?
            <Carousel 
              windowSize = {1}
              ref = {(c) => {this._carousel = c;}}
              data = {carouselData}
              renderItem = {(item) => this._renderHomeCarousel(item)}
              layout = 'default'
              sliderWidth = {width}
              itemWidth = {width-50}
              removeClippedSubviews = {false}
              autoplay = {true}
              loop = {true}
            />
          : 
            <Carousel 
              windowSize = {1}
              ref = {(c) => {this._carousel = c;}}
              data = {carouselData}
              renderItem = {(item) => this._renderSectionCarousel(item)}
              layout = 'default'
              sliderWidth = {width}
              itemWidth = {width-1}
              inactiveSlideScale = {1}
              inactiveSlideOpacity = {1}
              removeClippedSubviews = {false}
              autoplay = {true}
              loop = {true}
            />
        }
        
      </View>
    );
  }
}

function mapStateToProps(state) {
	return {
    themState: state.dataReducer.themState,
    bookmark: state.dataReducer.bookmark,
	}
}
export default connect(
	mapStateToProps,
)(CarouselComponent);

const styles = StyleSheet.create({
  carouselContainer: {
    width: '100%', 
    height: height*0.36, 
    flexDirection: 'column',
    alignItems: 'flex-start', 
    justifyContent: 'center', 
    backgroundColor: 'transparent',
    position: 'relative',
  },
  lastPostsCarousel: {
    width: '100%', 
    height: height*0.36, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  carouselTitleView: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 6,
  },
})

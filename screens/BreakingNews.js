import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Linking,
  ActivityIndicator,
  Platform,
  Slider,
} from 'react-native'
import { YellowBox } from 'react-native'

import Modal from 'react-native-simple-modal';

YellowBox.ignoreWarnings(['WebView'])
import {
  Container,
  CustomStyle,
  Iconbutton
} from '../components/Setting'
import constants from '../constants';

import Api from '../components/utils/Api'

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HTML from 'react-native-render-html';
import SwipeLists from './component/SwipeList'

import { connect } from 'react-redux';
import { changeStyle } from '../redux/action/index';
import Share from 'react-native-share'

const {width, height} = Dimensions.get('window')
const defaultRenderer = {
  alterChildren: (node) => {
    if(node.name === 'iframe') {
      delete node.attribs.width;
      delete node.attribs.height;
    } 
    return node.children;
  },
  renderers: {
    img: (htmlAttribs, children, convertedCSSStyles, passProps) => {
      if(htmlAttribs.height && htmlAttribs.width) {
        let imageHeight = parseInt(htmlAttribs.height)
        let imageWidth = parseInt(htmlAttribs.width)
        if(imageWidth > width - 50) {
          imageHeight = (width - 50)*(imageHeight/imageWidth)
          imageWidth = width - 50
        }
        return (
          <View style = {{width: width - 50, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
            <Image source = {{uri: htmlAttribs.src}} style = {{width: imageWidth, height: imageHeight}} resizeMode = 'cover' />
          </View>
        );
      }
    },
    figure: (htmlAttribs, children, convertedCSSStyles, passProps) => {
      return (
        <View style = {{width: width - 50, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          {children}
        </View>
      )
    },
  }
}

const DEFAULT_PROPS = {
  onLinkPress: (evt, href) => {Linking.openURL(href)},
}
export class ArticleDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderData: [],
      loading: true,
      imageUri: '',
      contentData: '',
      fontSize: 20,
      shareOpen: false,
      fontController: false,
      link: '',
      readmore: []
    }
  }

  componentDidMount() {
    this.getRenderData(this.props.navigation.state.params.postID)
  }

  async getRenderData(id) {
    try{
      let renderData = await Api.getArticleDetailFromId(id)
      this.setState({renderData: renderData.data})
      this.setState({link: renderData.data.link})
      this.setState({imageUri: renderData.data.image})
      this.setState({contentData: renderData.data.content.rendered.replace(/\\/g,'')})
      const readMoreData = await Api.getPostDataFromCategory(renderData.data.categories[0])
      this.setState({readmore: readMoreData.data})
      this.setState({loading: false})
    }
    catch(err){
      alert('Something went wrong')
      this.props.navigation.pop()
    }
  }

  scaleFontSize(value) {
    this.setState({
      fontSize: value
    })
  }

 
  modalDidClose = () => {
    this.setState({ shareOpen: false });
  };

  shareWithSocial(social) {
    const shareOptions = {
        title: 'qposts',
        message: 'some message',
        url: this.state.link,
    };
    Share.shareSingle(Object.assign(shareOptions, {
        "social": social
    }));
}

  render() {
    const {themState} = this.props
    const {loading, renderData, imageUri, contentData, fontSize} = this.state
    const transferedSize = fontSize
    return (
      <Container isWhiteTheme={themState}>
        {
          loading ? 
            <View style = {styles.container}>
              <ActivityIndicator color = '#FF8500' size = 'large' />
            </View>
          :
          <ScrollView style = {{width: '100%', flexGrow: 1}}>
            <View style = {styles.topBar}>
              <TouchableOpacity style = {{paddingRight: 15}} onPress = {() => this.props.navigation.pop()}>
                <FontAwesome name={'angle-right'} size={40} color={themState ? 'black' : 'white'} />
              </TouchableOpacity>
              <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity onPress = {() => this.setState({fontController: !this.state.fontController})}>
                  <Image source = {themState ? constants.Images.FONTSIZEICONBLACK : constants.Images.FONTSIZEICONWHITE} />
                </TouchableOpacity>
                <TouchableOpacity style = {{marginLeft: 30}} onPress = {() => this.setState({shareOpen: true})} >
                  <Image source = {themState ? constants.Images.SHAREICONBLACK : constants.Images.SHAREICONWHITE} />
                </TouchableOpacity>
              </View>
            </View>
            <View style = {{position: 'relative'}}>
              <View style = {{height: 20}}>
                
              </View>
              <View style = {styles.articleImageView}>
                <Image source = {{uri: `${imageUri}`}} style = {{width: '100%', height: height*0.36}} resizeMode = 'cover' />
              </View>
              {
                this.state.fontController &&
                <View style = {styles.fontController}>
                  <View style = {{width: '100%', alignItems: 'flex-start'}}>
                    <TouchableOpacity onPress = {() => this.setState({fontController: false})}>
                      <AntDesign name = {'closecircleo'} color = 'black' size = {18} />
                    </TouchableOpacity>
                  </View>
                    {
                      Platform.OS === 'ios' ?
                      <View style = {{width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 25, paddingHorizontal: 10}}>
                        <Text style = {{fontSize: 17, color: 'black'}}>A</Text>
                        <View style = {{flexDirection: 'column', alignItems: 'flex-end'}}>
                          <Slider 
                            style = {{width: 130}}
                            value = {this.state.fontSize}
                            onValueChange = {(value) => this.setState({fontSize: value})}
                            minimumValue = {17}
                            maximumValue = {25}
                          />
                        </View>
                        <Text style = {{fontSize: 25, color: 'black'}}>A</Text>
                      </View>
                      :
                      <View style = {{width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 25, paddingHorizontal: 10}}>
                        <Text style = {{fontSize: 25, color: 'black'}}>A</Text>
                        <View style = {{flexDirection: 'column', alignItems: 'flex-end'}}>
                          <Slider 
                            style = {{width: 130}}
                            value = {this.state.fontSize}
                            onValueChange = {(value) => this.setState({fontSize: value})}
                            minimumValue = {17}
                            maximumValue = {25}
                          />
                        </View>
                        <Text style = {{fontSize: 17, color: 'black'}}>A</Text>
                      </View>
                    }
                </View>
              }
            </View>
            <View style = {styles.articleDescriptionView}>
              <HTML 
                {...DEFAULT_PROPS}
                baseFontStyle = {themState ? {...CustomStyle.headerTitle, fontSize: 24} : {...CustomStyle.headerTitle, fontSize: 24, color: 'white'}}
                ignoredStyles = {["font-family", "letter-spacing", "width", "height","font-weight"]}
                html = {renderData.title.rendered}
              />
            </View>
              {
                (renderData.tie_post_sub_title != "") &&
                  <View style = {{...styles.articleDescriptionView, marginTop: 15}}>
                      <HTML 
                        {...DEFAULT_PROPS}
                        tagsStyles = {{
                            p: themState ? {...styles.subTitle} : {...styles.subTitle, color: 'white'},
                        }}
                        baseFontStyle = {themState ? {...styles.subTitle} : {...styles.subTitle, color: 'white'}}
                        ignoredStyles = {["font-family", "letter-spacing", "width", "height","font-weight"]}
                        html = {renderData.tie_post_sub_title}
                      />
                  </View>
              }
            <View style = {{...styles.articleDescriptionView, marginTop: 15}}>
              <View style = {{width: 24, height: 1, backgroundColor: '#979797'}} />
            </View>
            <View style = {{...styles.articleMain}}>
            <HTML 
                {...defaultRenderer}
                onLinkPress = {(evt, href) => this.toWebView(href)}
                tagsStyles = {{
                    strong: themState ? {...styles.articleContentText, fontSize: transferedSize} : {...styles.articleContentText, fontSize: transferedSize, color: 'white'},
                    span: {writingDirection: 'rtl'},
                    figcaption: themState ? {writingDirection: 'rtl'} : {writingDirection: 'rtl', color: 'white'}
                }}
                // classesStyles = {{
                //   'aligncenter': {display: 'none'}
                // }}
                staticContentMaxWidth = {width - 50}
                baseFontStyle = {{fontFamily: 'Cairo-SemiBold', writingDirection: 'rtl'}}
                ignoredStyles = {["font-family", "letter-spacing", "font-weight", "text-align"]}
                html = {contentData}
              />
            </View>
            <View style = {{flexDirection: 'column', width: '100%', }}>
              <View style = {{width: '100%', alignItems: 'flex-start', paddingHorizontal: 28, marginTop: 50}}>
                <Text style = {{fontSize: 24, color: '#FF5800', writingDirection: 'rtl', fontFamily: 'Cairo-Bold'}}>???????? ????????</Text>
              </View>
              <SwipeLists swipeData = {this.state.readmore}  navigation = {this.props.navigation}/>
            </View>          
          </ScrollView>          
        }
        <Modal
          open={this.state.shareOpen}
          modalDidOpen={this.modalDidOpen}
          modalDidClose={this.modalDidClose}
          containerStyle = {{
            flex: 1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginBottom: -20
          }}
        >
          <View style={{ alignItems: "center", width: width, paddingBottom: 10}}>
            <Text style = {{marginBottom: 10}}>Share with...</Text>
            <View style = {{flexDirection: 'row', width: width, justifyContent: 'space-between', paddingHorizontal: 20}}>
              <Iconbutton
                iconName={'facebook'}
                backgroundColor={constants.Colors.blueDark}
                onPress = {() => this.shareWithSocial('facebook')}
              />
              <Iconbutton
                iconName={'twitter'}
                backgroundColor={constants.Colors.blueSky}
                onPress = {() => this.shareWithSocial('twitter')}
              />
              <Iconbutton
                iconName={'whatsapp'}
                backgroundColor={'#25D366'}
                onPress = {() => this.shareWithSocial('whatsapp')}
              />
            </View>
          </View>
        </Modal>
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
)(ArticleDetailScreen);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 42,
    paddingHorizontal: 30,
  },
  articleImageView: {
    width: '100%',
    height: height*0.36,
    overflow: 'hidden',
    marginBottom: 17
  },
  articleDescriptionView: {
    width: '100%',
    paddingHorizontal: 28,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  articleMain: {
    width: '100%',
    paddingLeft: 28,
    paddingRight: 28,
    flexDirection: 'column',
  },
  articleContentText: {
    ...Platform.select({
      android: {
        fontWeight: null
      }
    }),
    writingDirection: 'rtl',
    textAlign: 'justify',
  },
  imageCenterView: {
    flexDirection: 'column',
    width: width,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontSizeController: {
    height: 45,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  sliderBar: {
    height: 30,
    marginRight: 30,
    borderRadius: 8,
    position: 'relative',
    width: 150,
    flexDirection: 'column',
    alignItems: 'center'
  },
  sliderController: {
    position: 'absolute',
    right: 7,
    top: -15,
  },
  subTitle: {
    fontSize: 16,
    ...Platform.select({
      android: {
        fontWeight: null
      }
    }),
    writingDirection: 'rtl',
    fontFamily: 'Cairo-SemiBold',
    paddingLeft: 20
  },
  fontController: {
    width: 171, 
    height: 46, 
    borderRadius: 4,
    flexDirection: 'column',
    backgroundColor: 'white', 
    position: 'absolute', 
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    top: 5, 
    right: 25,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 2,
  },
  readmore: {
    marginTop: 50,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  }
})
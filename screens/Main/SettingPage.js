import React from "react";
import {
  View,
  Text,
  Alert,
  Platform,
  Switch,
  Linking,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import {
  CustomStyle,
  Container,
  Iconbutton,
  TextDescription,
  NavigationButton,
} from '../../components/Setting'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import constants from '../../constants';
import SafariView from 'react-native-safari-view';
import OneSignal from 'react-native-onesignal';
import AsyncStorage from '@react-native-community/async-storage';

import { connect } from 'react-redux';
import { changeStyle, setNotificationPermission } from '../../redux/action/index';

export class SettingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      isNotification: props.permission == '1' ? true : false,
      isWhiteTheme: true,
      iosPermission: false
    }
  }

  setNotification(value) {
    AsyncStorage.setItem('permission', value)
    value === '0' ? OneSignal.setSubscription(false) : OneSignal.setSubscription(true)
    this.props.setNotificationPermission(value)
  }

  onChangeIsNotification = () => {
    this.state.isNotification ?
      this.setNotification('0')
      :
      this.setNotification('1')
    
    
    this.setState(prevState => ({
      isNotification: !prevState.isNotification
    })); 
  }

  onChangeIsWhiteTheme = () => {
    this.props.changeStyle(!this.props.themState);
  }

  toWebView(url) {
    this.props.navigation.navigate('WebView', {url: url})
  }

  rateThisApp() {
    Platform.OS == 'ios' ?
    SafariView.isAvailable()
      .then(() => {
        SafariView.show({url: 'https://apps.apple.com/app/id1388046409'});
      })
      .catch(() => {
        Alert.alert(Config.APP_NAME, MSG_GENERAL);
      })
    :
    this.props.navigation.navigate('WebView', {url: 'https://play.google.com/store/apps/details?id=com.qposts2029.main'})
  }

  iosPermissionCheck() {
    
  }

  render() {
    const {
      isWhiteTheme,
      isNotification,
    } = this.state
    const {themState} = this.props
    return (
      <Container
        isWhiteTheme={themState}
      >
        <ScrollView style = {{flex: 1, width: '100%'}}>
          <View style = {CustomStyle.containerWithHPadding}>
            <View style={{...CustomStyle.hrContainer, borderBottomWidth: 0, marginTop: 47}}>
              <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity style = {{marginRight: 12}} onPress = {() => this.iosPermissionCheck()}>
                  <FontAwesome name={'angle-right'} size={40} color={themState ? 'black' : 'white'} />
                </TouchableOpacity>
                <Text style={themState ? CustomStyle.title : {...CustomStyle.title, color: constants.Colors.white}}>
                  الإعدادت
                </Text>
              </View>
              <Image source = {constants.Images.LOGO} />
            </View>
            <View style={themState ? CustomStyle.hrContainer : {...CustomStyle.hrContainer, borderBottomColor: constants.Colors.dividerDarkColor}}>
              <TextDescription
                buttonText={'الإشعارات'}
                isWhiteTheme={themState}
              />
              <View style={{...CustomStyle.row, alignItems: 'center',}}>
                <Text style={themState ? CustomStyle.switchButtonText : {...CustomStyle.switchButtonText, color: constants.Colors.white}}>
                  {
                    !isNotification
                      ? 'ايقاف'
                      : 'تشغيل'
                  }
                </Text>
                <Switch
                  value={isNotification}
                  disabled = {this.state.iosPermission}
                  onValueChange={this.onChangeIsNotification}
                />
              </View>
            </View>
            <View style={themState ? CustomStyle.hrContainer : {...CustomStyle.hrContainer, borderBottomColor: constants.Colors.dividerDarkColor}}>
              <TextDescription
                buttonText={'خلفية التصفح'}
                isWhiteTheme={themState}
              />
              <View style={{...CustomStyle.row,alignItems: 'center',}}>
                <Text style={themState ? CustomStyle.switchButtonText : {...CustomStyle.switchButtonText, color: constants.Colors.white}}>
                  {
                    !themState
                    ? 'أبيض'
                    : 'أسود'
                  }
                </Text>
                <Switch
                  value={!themState}
                  onValueChange={this.onChangeIsWhiteTheme}
                />
              </View>
            </View>
            <View style={themState ? CustomStyle.hrContainer : {...CustomStyle.hrContainer, borderBottomColor: constants.Colors.dividerDarkColor}}>
              <TouchableOpacity
                style = {{paddingVertical: 6, paddingRight: 12}}
                onPress = {() => this.toWebView('https://www.qposts.com/about/')}
              >
                <TextDescription
                  buttonText={'عن كيوبوست'} // about qposts
                  isWhiteTheme={themState}
                />
              </TouchableOpacity>
              <NavigationButton
                onPress={() => this.toWebView('https://www.qposts.com/about/')}
              />
            </View>
            <View style={themState ? {...CustomStyle.hrContainer, justifyContent: 'flex-start'} : {...CustomStyle.hrContainer, justifyContent: 'flex-start', borderBottomColor: constants.Colors.dividerDarkColor}}>
              <TouchableOpacity 
                style = {{paddingVertical: 6, paddingRight: 12}}
                onPress={() => this.rateThisApp()}
              >
                <TextDescription
                  buttonText={'قيم التطبيق'} //Rate App
                  isWhiteTheme={themState}
                />
              </TouchableOpacity>
            </View>
            <View style={themState ? {...CustomStyle.hrContainer, justifyContent: 'flex-start'} : {...CustomStyle.hrContainer, justifyContent: 'flex-start', borderBottomColor: constants.Colors.dividerDarkColor}}>
              <TouchableOpacity 
                style = {{paddingVertical: 6, paddingRight: 12}}
                onPress={() => this.toWebView('http://eepurl.com/dy3Qtf')}
              >
                <TextDescription
                  buttonText={'إشترك في القائمة البريدية'} //subscribe our mailing list
                  isWhiteTheme={themState}
                />
              </TouchableOpacity>
            </View>
            <View style={themState ? {...CustomStyle.hrContainer} : {...CustomStyle.hrContainer, borderBottomColor: constants.Colors.dividerDarkColor}}>
              <TextDescription
                buttonText={'تابعنا'} //follow us
                isWhiteTheme={themState}
              />
              <View style={CustomStyle.row}>
                <Iconbutton
                  iconName={'facebook'}
                  backgroundColor={constants.Colors.blueDark}
                  onPress={() => this.toWebView('https://www.facebook.com/Qpostsnow')}
                />
                <Iconbutton
                  iconName={'twitter'}
                  backgroundColor={constants.Colors.blueSky}
                  onPress={() => this.toWebView('https://twitter.com/qpostsnow')}
                />
                <Iconbutton
                  iconName={'youtube'}
                  backgroundColor={constants.Colors.redDark}
                  onPress={() => this.toWebView('https://www.youtube.com/channel/UC_-tmWEvDF-CexX3MZX5tgg')}
                />
              </View>
            </View>
            <View style={themState ? {...CustomStyle.hrContainer, justifyContent: 'flex-start'} : {...CustomStyle.hrContainer, justifyContent: 'flex-start', borderBottomColor: constants.Colors.dividerDarkColor}}>
              {/* <TouchableOpacity
                style = {{paddingVertical: 6, paddingRight: 12}}
                onPress = {() => this.props.navigation.navigate('ContactUs')}
              > */}
              <TouchableOpacity
                style = {{paddingVertical: 6, paddingRight: 12}}
                onPress = {() => Linking.openURL('mailto:info@qposts.com')}
              >
                <TextDescription
                  buttonText={'اتصل بنا'} //call us
                  isWhiteTheme={themState}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Container>
    );
  }
}

function mapStateToProps(state) {
	return {
    themState: state.dataReducer.themState,
    permission: state.dataReducer.permission,
	}
}

const mapDispatchToProps = dispatch => ({
  changeStyle: (them) => dispatch(changeStyle(them)),
  setNotificationPermission: (permission) => dispatch(setNotificationPermission(permission))
});
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(SettingPage);
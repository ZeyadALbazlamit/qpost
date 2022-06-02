import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Platform,
  Linking
} from 'react-native'

import email from 'react-native-email'

import {
  Container,
  CustomStyle,
} from '../components/Setting'

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import constants from '../constants';
const {width, height} = Dimensions.get('window')

import { connect } from 'react-redux';
import { updateBookMarkIds } from '../redux/action/index';

export class ContactUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      subject: '',
      message: '',
    }
  }

  sendMail() {
    Linking.openURL('mailto:info@qposts.com')
  }

  render() {
    const {email, subject, message} = this.state
    return (
      <View style = {{width: '100%', flex: 1, flexDirection: 'column', paddingTop: 47}}>
        <View style = {styles.topbar}>
          <TouchableOpacity onPress = {() => this.sendMail()}>
            <Text style = {{color: constants.Colors.blueSky, fontSize: 18, fontWeight: '700'}}>Send</Text>
          </TouchableOpacity>
          <Text style = {CustomStyle.descriptionBoldText}>اتصل بنا</Text>
          <TouchableOpacity onPress = {() => this.props.navigation.pop()}>
            <Text style = {{color: constants.Colors.blueSky, fontSize: 18, fontWeight: '700'}}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <View style = {{width: '100%', flex: 1, paddingRight: 18 }}>
          <View style = {styles.inputBox}>
            <Text style = {{...styles.placeHolder, color: constants.Colors.blueSky}}>info@qposts.com</Text>
            <Text style = {styles.placeHolder}>To: </Text>
          </View>
          <View style = {{...styles.inputBox, borderBottomWidth: 0}}>
            <TextInput 
              style = {{...styles.searchInput, color: constants.Colors.gray}} 
              value = {email}
              onChangeText = {(text) => this.setState({email: text})}
            />
            <Text style = {styles.placeHolder}>Cc/Bcc From: </Text>
          </View>
          <View style = {{...styles.inputBox}}>
            <TextInput 
              style = {{...styles.searchInput,}} 
              value = {subject}
              onChangeText = {(text) => this.setState({subject: text})}
            />
            <Text style = {styles.placeHolder}>Subject: </Text>
          </View>
          <TextInput 
            style = {{...styles.message, }} 
            value = {message}
            onChangeText = {(text) => this.setState({message: text})}
            multiline = {true}
          />
        </View>
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
const mapDispatchToProps = dispatch => ({
  updateBookMarkIds: (data) => dispatch(updateBookMarkIds(data)),
});
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ContactUs);

const styles = StyleSheet.create({
  topbar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 14,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: constants.Colors.dividerColor,
  },
  customFonts: {

  },
  inputBox: {
    height: 55,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderBottomColor: constants.Colors.dividerColor,
    borderBottomWidth: 1,
  },
  placeHolder: {
    fontSize: 22,
    fontFamily: 'Cairo-SemiBold',
    color: constants.Colors.gray
  },
  searchInput: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 0,
    writingDirection: 'ltr',
    fontFamily: 'Cairo-Bold', 
    fontSize: 16,
    ...Platform.select({
      android: {
        fontWeight: 'normal'
      }
    }),
  },
  message: {
    paddingTop: 12,
    width: '100%',
    paddingLeft: 18,
    flexDirection: 'column',
    paddingVertical: 0,
    writingDirection: 'ltr',
    fontFamily: 'Cairo-Bold', 
    fontSize: 22,
    ...Platform.select({
      android: {
        fontWeight: 'normal'
      }
    }),
  }
})
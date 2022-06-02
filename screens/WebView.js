import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import WebUI from 'react-native-webview'

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';
import { changeStyle } from '../redux/action/index';

export class ArticleDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  loadEnded() {
    this.setState({loading: false})
  }

  render() {
    const {themState} = this.props
    return (
      <View style = {{width: '100%', flex: 1}}>
        <View style = {styles.topBar}>
          <TouchableOpacity style = {{paddingRight: 15, paddingLeft: 30}} onPress = {() => this.props.navigation.pop()}>
            <FontAwesome name={'angle-right'} size={40} color={themState ? 'black' : 'white'} />
          </TouchableOpacity>
        </View>
        {
          this.state.loading &&
          <View style = {{width: '100%', alignItems: 'center', paddingVertical: 12}}>
            <ActivityIndicator size = 'large' color = '#FF5800' />
          </View>
        }
        <WebUI 
          source={{ uri: this.props.navigation.state.params.url}} 
          style = {{width: '100%', flex: 1 }}
          onLoad = {() => this.loadEnded()}
        />                 
      </View>
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
    marginTop: 25,
    // paddingHorizontal: 30,
    marginBottom: 10
  },
})
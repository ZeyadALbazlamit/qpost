import React, { Component } from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    Image,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    Dimensions,
    Linking
} from 'react-native';
import Share from 'react-native-share'
import Carousel, {Pagination} from 'react-native-snap-carousel'

const {width} = Dimensions.get('window')

import { connect } from 'react-redux';
import { changeStyle } from '../../redux/action/index'; //Import your actions
import constants from '../../constants';
import { WebView } from 'react-native-webview';

class Home extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <WebView source={{ uri: 'https://facebook.github.io/react-native/' }} />
        );
    }
};



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
)(Home);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'center',
        // backgroundColor: 'blue'
    },
    cover: {
        // flex: 1,
        width: width-100,
        height: 100
    },
    linearGradient: {
        width: 50,
        height: 50,
        position: 'absolute',
        // top: 10,
        // right: 10
    },
    buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
    },
});
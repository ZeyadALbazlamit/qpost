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
} from 'react-native'
import {
  CustomStyle,
  Container,
} from '../Setting'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const {width} = Dimensions.get('window')

import connect from 'react-redux'


const TabBarLabel = props => {
  const {
    label
  } = this.props;

  return(
    <Text>{label}</Text>
  )
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
)(BookMarkPage);


const styles = StyleSheet.create({
	
})
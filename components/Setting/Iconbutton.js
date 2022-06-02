import React from 'react'
import {
  TouchableOpacity,
  Text,
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomStyle from './CustomStyle'

const Iconbutton =({
  onPress,
	iconName,
  backgroundColor,
} = this.props) =>
  <TouchableOpacity
    style={{...CustomStyle.iconButton, backgroundColor: backgroundColor}}
    onPress={onPress}
  >
    <FontAwesome name={iconName} size={16} color={'#fff'} />
  </TouchableOpacity>

export default Iconbutton
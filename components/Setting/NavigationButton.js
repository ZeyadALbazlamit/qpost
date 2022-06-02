import React from 'react'
import {
  TouchableOpacity,
  Text,
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomStyle from './CustomStyle'
import constants from '../../constants';

const NavigationButton =({
  onPress,
} = this.props) =>
  <TouchableOpacity
    onPress={onPress}

  >
    <FontAwesome name={'angle-left'} style={CustomStyle.navigationButton} size={40} color={constants.Colors.gray}/>
  </TouchableOpacity>

export default NavigationButton
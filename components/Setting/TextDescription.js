import React from 'react'
import {
  TouchableOpacity,
  Text,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomStyle from './CustomStyle'
import constants from '../../constants';

const TextDescription =({
  buttonText,
  isWhiteTheme,
} = this.props) =>
    <Text style={isWhiteTheme ? CustomStyle.buttonText : {...CustomStyle.buttonText, color: constants.Colors.white}}>
			{buttonText}
		</Text>

export default TextDescription
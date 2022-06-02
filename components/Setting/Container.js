import React from 'react';
import {View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import CustomStyle from './CustomStyle';
import constants from '../../constants';

const Container = ({
  children,
	isWhiteTheme,
} = this.props) =>
	<View
		style={isWhiteTheme? CustomStyle.container : {...CustomStyle.container, backgroundColor: constants.Colors.grayDark2}}
		// forceInset={{ top: 'always', bottom: 'always' }}
	>
		{children}
	</View>

export default Container
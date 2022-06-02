import { StyleSheet } from 'react-native'
import constants from '../../constants';

const styles = StyleSheet.create({
	iconWithBadge: {
		position: 'absolute',
		right: -6,
		top: -3,
		backgroundColor: constants.Colors.red,
		borderRadius: 6,
		width: 12,
		height: 12,
		justifyContent: 'center',
		alignItems: 'center'
	},
	badgeCount: {
		color: constants.Colors.white,
		fontSize: 10,
		fontWeight: 'bold'
	}
})

export default styles
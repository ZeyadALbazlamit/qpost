import { StyleSheet } from 'react-native'
import constants from '../../constants';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: constants.Colors.white,
	},
	headerContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 28,
    marginTop: 47,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
	containerWithHPadding: {
		flexDirection: 'column',
		width: '100%',
		paddingHorizontal: 30,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	title: {
		fontSize: 24,
		fontFamily: 'Cairo-Bold',
		writingDirection: 'rtl',
		color: constants.Colors.textBlack
	},
	hrContainer: {
		height: 83,
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottomColor: constants.Colors.dividerWeakColor,
		borderBottomWidth: 1,
	},
	iconButton: {
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: constants.Colors.purple,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 15,
	},
	buttonText: {
		fontFamily: 'Cairo-Bold',
		writingDirection: 'rtl',
		fontSize: 20,
		color: '#1D2532'
	},
	row: {
		flexDirection: 'row',
	},
	switchButtonText: {
		fontSize: 15,
		color: constants.Colors.grayDark,
		textAlign: 'center',
		paddingHorizontal: 10,
		fontFamily: 'Cairo-Bold',
		writingDirection: 'rtl',
	},
	navigationButton: {
		marginTop: -8,
		paddingLeft: 12
	},
	headerTitle: {
    fontSize: 30,
		fontFamily: 'Cairo-Bold',
		writingDirection: 'rtl',
    color: constants.Colors.textBlack,
	},
	subHeaderTitle: {
		fontSize: 15,
		fontFamily: 'Cairo-Bold', 
		writingDirection: 'rtl',
		color: constants.Colors.textWeakBlack
	},
	carouselTitle: {
		color: 'white', 
		fontSize: 20,
		fontFamily: 'Cairo-Bold',
		writingDirection: 'rtl',
	},
	carouselText: {
		color: 'white', 
		fontSize: 20,
		fontFamily: 'Cairo-SemiBold',
		writingDirection: 'rtl',
	},
	descriptionBoldText:{
		fontSize: 17,
		fontFamily: 'Cairo-Bold',
		lineHeight: 25,
		paddingTop: 10,
		color: constants.Colors.textBlack,
		writingDirection: 'rtl',
	},
	descriptionText:{
		fontSize: 15,
		fontFamily: 'Cairo-SemiBold',
		writingDirection: 'rtl',
		color: constants.Colors.textGray,
	},
	sectionWrapper: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  sectionContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingRight: 19,
  },
  articleDivider: {
    width: '100%',
    height: 1,
    marginLeft: 20,
    backgroundColor: constants.Colors.dividerWeakColor,
  },
  articleTitleView: {
    flexDirection:'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  articleAvatar: {
    width: 106,
    height: 82,
  },
  avartarWrapper: {
    borderWidth: 0,
    borderRadius: 8,
    borderTopLeftRadius: 0,
    width: 106,
    height: 82,
    marginRight: 17,
    overflow: 'hidden',
    position: 'relative',
    marginVertical: 17,
  },
  videoMarkfloat: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  articleWrapper: {
    flexDirection: 'row-reverse',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  videoMarkfloat: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  rowBack: {
		alignItems: 'center',
		backgroundColor: 'white',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
	},
	backRightBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 120,
    backgroundColor: constants.Colors.grayLight,
    left: 0
	},
	checkedIcon: {
		height: 25,
		width: 25,
	},
	bookMarkfloat: {
    position: 'absolute',
    bottom: -1,
    left: -3,
	},
	topBar: {
		width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 47,
		marginBottom: 22,
		paddingHorizontal: 28
	}
})

export default styles
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { connect } from 'react-redux';
import { Platform, Keyboard } from 'react-native';
import constants from "../constants";
const {height} = Dimensions.get('window')

class TabBar extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      visible: true
    }
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      this.keyboardEventListeners = [
        Keyboard.addListener('keyboardDidShow', this.visible(false)),
        Keyboard.addListener('keyboardDidHide', this.visible(true))
      ];
    }
  }
  componentWillUnmount() {
    if(Platform.OS === 'android') {
      this.keyboardEventListeners.forEach((eventListener) => eventListener.remove());
    }
  }

  visible = visible => () => this.setState({visible});

  render() {
    const {
      renderIcon,
      getLabelText,
      activeTintColor,
      inactiveTintColor,
      onTabPress,
      onTabLongPress,
      getAccessibilityLabel,
      navigation,
      themState
    } = this.props;

    const { routes, index: activeRouteIndex } = navigation.state;

    if (!this.state.visible) return null;

    return(
      <View style={themState ? {...styles.container} : {...styles.container, backgroundColor: '#2F3846', borderTopColor: '#9696A7'}}>
        {routes.map((route, routeIndex) => {
          const isRouteActive = routeIndex === activeRouteIndex;
          const tintColor = isRouteActive ? activeTintColor : themState ? inactiveTintColor : 'white';

          return (
            <TouchableOpacity
              key={routeIndex}
              style={styles.tabButton}
              onPress={() => {
                onTabPress({ route });
              }}
              onLongPress={() => {
                onTabLongPress({ route });
              }}
              accessibilityLabel={getAccessibilityLabel({ route })}
            >
              {renderIcon({ route, focused: isRouteActive, tintColor })}

              <Text style = {{...styles.tabLabel, color: tintColor}}>{getLabelText({ route })}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    )
  };
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
)(TabBar);

const styles = StyleSheet.create({
	container: { 
    flexDirection: "row", 
    height: 80, 
    alignItems: 'flex-start',
    paddingTop: 9,
    // elevation: 2 ,
    borderTopColor: constants.Colors.dividerWeakColor,
    borderTopWidth: 1
  },
  tabButton: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  tabLabel: {
    fontSize: 16,
    fontFamily: 'BoutrosArabiyaM'
  }
})
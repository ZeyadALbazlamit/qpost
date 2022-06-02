import React from "react";
import {
  View,
  Text,
} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import style from './styles'

export default class IconWithBadge extends React.Component {
  render() {
    const { name, badgeCount, color, size } = this.props;
    return (
      <View style={{ width: 24, height: 24, margin: 5 }}>
        <AntDesign name={name} size={size} color={color} />
        { badgeCount > 0 && (
          <View style={style.iconWithBadge}>
            <Text style={style.badgeCount}>{badgeCount}</Text>
          </View>
        )}
      </View>
    );
  }
}
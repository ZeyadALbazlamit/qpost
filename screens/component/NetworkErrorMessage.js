import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'

import { connect } from 'react-redux';
import { insertCategoryData, updateBookMarkIds, networkState } from '../../redux/action/index';


export class HomePage extends React.Component {

  render() {
    const {themState, categoryData, netState} = this.props
    if(netState) {
      return (null);
    }else{
      return (
          <View style = {styles.errorView}>
            <Text style = {{fontFamily: 'Cairo-SemiBold', fontSize: 12, textAlign: 'center', color: 'white'}}>عذرا ، ليس هناك اتصال بالإنترنت </Text>
          </View>
      );
    }
  }
}
const mapStateToProps = (state) => {
	return {
    themState: state.dataReducer.themState,
    categoryData: state.dataReducer.categoryData,
    netState: state.dataReducer.netState,
    bookmark: state.dataReducer.bookmark,
	}
}

const mapDispatchToProps = dispatch => ({
  insertCategoryData: (data) => dispatch(insertCategoryData(data)),
  updateBookMarkIds: (data) => dispatch(updateBookMarkIds(data)),
  networkState: (data) => dispatch(networkState(data)),
});
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(HomePage);

const styles = StyleSheet.create({
  errorView: {
    width: '100%',
    height: 33,
    backgroundColor: '#FF5800',
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
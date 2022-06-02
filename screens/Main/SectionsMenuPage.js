import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  Container,
  CustomStyle
} from '../../components/Setting'
import Api from '../../components/utils/Api'
import constants from '../../constants';

import { connect } from 'react-redux';
import { changeStyle, insertCategoryData } from '../../redux/action/index';
import { ScrollView } from "react-native-gesture-handler";
import NetworkError from '../component/NetworkErrorMessage'

export class SectionsMenuPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      netError: !props.netState,
    }
  }

  render() {
    const {themState, sections} = this.props
    let orderedData = []
    if(sections.length > 0) {
      let ids=sections.map((item)=>item.id)
      orderedData = [593,7,2,844,6,14811,3,6694,16,43,19,18,968,26].map(item => {
        return sections.filter(filter => item === filter.id  ) 
      })
    }


    return (
      <Container isWhiteTheme={themState}>
        <ScrollView 
          style = {{flex: 1, width: '100%', paddingBottom: 30}}
        >
          <View style = {CustomStyle.topBar}>
            <TouchableOpacity style = {{marginRight: 12}}>
              <FontAwesome name={'angle-right'} size={40} color={themState ? 'black' : 'white'} />
            </TouchableOpacity>
            <Text style = {themState ? CustomStyle.headerTitle : {...CustomStyle.headerTitle, color: 'white'}}>القائمة</Text>
          </View>
          <NetworkError />
          <View style = {styles.container}>  
            <FlatList 
              style = {{flexDirection: 'column', width: '100%'}}
              data = {orderedData}
              keyExtractor = {(item, key) => key.toString()}
              ItemSeparatorComponent = {() => (<View style = {themState ? {...styles.articleDivider} : {...styles.articleDivider, backgroundColor: constants.Colors.dividerDarkColor}} />)}
              renderItem = {({item, index, separators}) => (
                <TouchableOpacity onPress = {() => this.props.navigation.navigate('SectionScreen', {
                  id: 17,
                  title:  item[0].id ===3	 ?  "مقالات":item[0]?.name
                })}>
                  <View style = {styles.selectionList}>
                    <Text style = {themState ? {...CustomStyle.descriptionBoldText, fontSize: 20} : {...CustomStyle.descriptionBoldText, fontSize: 20, color: 'white'}} numberOfLines = {1}>
                    { item[0].id ===3	 ?  "مقالات":item[0]?.name}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />

            <View style = {themState ? {...styles.articleDivider} : {...styles.articleDivider, backgroundColor: constants.Colors.dividerDarkColor}} />
            <TouchableOpacity onPress = {() => this.props.navigation.navigate('WebView', {url: "https://www.qposts.com/%d9%81%d8%b1%d9%8a%d9%82-%d9%83%d9%8a%d9%88%d8%a8%d9%88%d8%b3%d8%aa-2/"})}>
              <View style = {styles.selectionList}>
                <Text style = {themState ? {...CustomStyle.descriptionBoldText, fontSize: 20} : {...CustomStyle.descriptionBoldText, fontSize: 20, color: 'white'}} numberOfLines = {1}>{"فريق كيوبوست "}</Text>
              </View>
            </TouchableOpacity>
            <View style = {themState ? {...styles.articleDivider} : {...styles.articleDivider, backgroundColor: constants.Colors.dividerDarkColor}} />
            <TouchableOpacity onPress = {() => this.props.navigation.navigate('WebView', {url: "https://www.qposts.com/%d9%83%d8%aa%d8%a7%d8%a8-%d9%83%d9%8a%d9%88%d8%a8%d9%88%d8%b3%d8%aa/"})}>
              <View style = {styles.selectionList}>
                <Text style = {themState ? {...CustomStyle.descriptionBoldText, fontSize: 20} : {...CustomStyle.descriptionBoldText, fontSize: 20, color: 'white'}} numberOfLines = {1}>{"كتاب كيوبوست "}</Text>
              </View>
            </TouchableOpacity>
            <View style = {themState ? {...styles.articleDivider} : {...styles.articleDivider, backgroundColor: constants.Colors.dividerDarkColor}} />
          </View>
        </ScrollView>
      </Container>
    ); 
  }
}

function mapStateToProps(state) {
	return {
    themState: state.dataReducer.themState,
    categoryData: state.dataReducer.categoryData,
    netState: state.dataReducer.netState,
    sections: state.dataReducer.sections,
	}
}

const mapDispatchToProps = dispatch => ({
  changeStyle: () => dispatch(changeStyle()),
  insertCategoryData: (data) => dispatch(insertCategoryData(data)),
});
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(SectionsMenuPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 30,
    marginBottom: 30
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 47,
    marginBottom: 22,
    paddingHorizontal: 30
  },
  selectionList: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  articleDivider: {
    width: '100%',
    height: 1,
    backgroundColor: constants.Colors.dividerWeakColor,
    marginVertical: 19,
  },
  loadMoreView: {
    flexDirection: 'column',
    width: '100%',
    marginVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
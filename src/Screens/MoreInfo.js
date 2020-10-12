import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';

import DropDownItem from 'react-native-drop-down-item';

import essenceData from '../helpers/EssenceArbre';
import {getEssenceFromDataWithSearchedText} from '../helpers/EssenceArbre';

class MoreInfo extends React.Component {
    constructor(props) {
        super(props)

        this.searchedText = ""

        this.state = {
            contents: essenceData
        }
    }

    _searchTextInputChanged(text) {
      this.searchedText = text

      if (this.searchedText.length > 0) {
        this.setState({
          contents: getEssenceFromDataWithSearchedText(this.searchedText)
        })
      }
      else {
        this.setState({
          contents: essenceData
        })
      }
    }
  render() {
    return (
        <View style={styles.container}>
          <TextInput
            style={styles.search}
            placeholder='Recherchez une essence'
            placeholderTextColor='black'
            onChangeText={(text) => this._searchTextInputChanged(text)}/>
          <View style={{alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: 'black',
                width: '50%',
                height: 2,
                marginBottom: 10,
              }}
            ></View>
          </View>
        <ScrollView style={{ alignSelf: 'stretch' }}>
          {
            this.state.contents
              ? this.state.contents.map((param, i) => {
                return (
                  <DropDownItem
                    key={i}
                    style={styles.dropDownItem}
                    contentVisible={false}
                    invisibleImage={null}
                    visibleImage={null}
                    backgroundColor='#ccc'
                    header={
                      <View style={styles.header}>
                        <Text style={styles.headerText}>{param.title}</Text>
                      </View>
                    }
                  >
                    <Text style={styles.bodyText}>{param.body}</Text>
                  </DropDownItem>
                );
              })
              : null
          }
          <View style={{ height: 96 }}/>
          <TouchableOpacity onPress = {() => this.props.navigation.navigate("Accueil")} style={styles.button}>
            <Image
              source = {require('../Ressources/Images/goBack.png')}
              style = {styles.goBack_image}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
    )}
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  search: {
    margin: 20,
    borderColor: 'black',
    borderWidth: StyleSheet.hairlineWidth,
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  header: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#aaa',
    borderColor: '#999',
    borderTopWidth: 2,
    borderBottomWidth: 2
  },
  headerText: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
    marginRight: 60,
    flexWrap: 'wrap',
  },
  bodyText: {
    fontSize: 18,
  },
  button: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginTop: 15,
    marginRight: 5,
    marginBottom: 15,

    padding: 5,

    height:54,
    width:54,

    borderRadius:27,

    backgroundColor:'#eee',

    justifyContent:'center',
    alignItems:'center',
  },
  goBack_image: {
    width: 32,
    height: 32
  },
});

export default MoreInfo

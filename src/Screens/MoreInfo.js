import React from 'react';
import { StyleSheet, View, ScrollView, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';

import ListEssence from '../Components/ListEssence';
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

  __searchTextInputChanged(text) {
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
            onChangeText={(text) => this.__searchTextInputChanged(text)}/>
          <View style={{alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: 'black',
                width: '50%',
                height: 2,
                marginBottom: 10,
              }}
            >
            </View>
          </View>
        <ScrollView style={{ alignSelf: 'stretch' }}>
          <FlatList
              style={styles.flatlist}
              data={this.state.contents}
              keyExtractor={(item) => item.id.toString()}
              renderItem= {({ item }) => (
                <ListEssence
                  item={item}
                />
              )}
          />
        </ScrollView>
        <TouchableOpacity onPress = {() => this.props.navigation.navigate("Accueil")} style={styles.button}>
            <Image
              source = {require('../Ressources/Images/goBack.png')}
              style = {styles.goBack_image}
            />
        </TouchableOpacity>
      </View>
    )
  }
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
  flatlist: {
    marginHorizontal: 10
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

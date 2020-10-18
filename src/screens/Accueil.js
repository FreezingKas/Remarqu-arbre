import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import {Provider} from 'react-native-paper'

import data from '../helpers/Arbre';
import { getArbreFromDataWithSearchedText } from '../helpers/Arbre';

import MyMap from '../Components/MyMap';

import ListItem from '../Components/ListItem';
import MyModal from '../Components/MyModal'
import MyMenu from '../Components/MyMenu';

class Accueil extends React.Component {

  constructor(props) {
    super(props)
    modalizeRef = React.createRef()
    this.searchedText = ""

    this.state = {
      data: data,
      isModalVisible: false,
      isMenuVisible: false,
    }
  }

  onOpen = () => {
    modalizeRef.current?.open();
  };

  toggleModal = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible
    })
  };

  toggleMenu = () => {
    this.setState({
      isMenuVisible: !this.state.isMenuVisible
    })
  };

  _searchTextInputChanged(text) {
    this.searchedText = text

    if (this.searchedText.length > 0) {
      this.setState({
        data: getArbreFromDataWithSearchedText(this.searchedText)
      })
    }
    else {
      this.setState({
        data: data
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />

        <MyMap></MyMap>
        <Provider>
          <MyMenu state={this.state.isMenuVisible}
                  funcToggleMenu={this.toggleMenu}
                  funcToggleModal={this.toggleModal}
                  nav={this.props.navigation}
                  funcOpenModalize={this.onOpen}
                  />
        </Provider>

        <Modalize
          ref={modalizeRef}
          flatListProps={{
            style: styles.flatlist,
            data: this.state.data,
            keyExtractor: (item) => item.id.toString(),
            renderItem: ({ item }) => (
              <ListItem
                item={item}
                nav={this.props.navigation}
              />
            )
          }}
          modalHeight={500}
          HeaderComponent={
            <View>
              <Text style={styles.historique}>Historique</Text>
              <TextInput
                style={styles.search}
                placeholder='Recherchez un arbre'
                onChangeText={(text) => this._searchTextInputChanged(text)} />
            </View>
          }
        />

        <MyModal state={this.state.isModalVisible} funcToggle={this.toggleModal}></MyModal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    top: 0,
    left: 0,
    marginTop: 15,
    marginHorizontal: 15,

    padding: 5,

    height: 54,
    width: 54,

    borderRadius: 27,

    backgroundColor: '#FFF',

    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 12,
    },
    shadowOpacity: 0.98,
    shadowRadius: 18.00,

    elevation: 38,
  },
  imageButton: {
    width: 32,
    height: 32
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  search: {
    margin: 20,
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  historique: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32
  },
  itemArbre: {
    marginVertical: 5
  },
  flatlist: {
    marginHorizontal: 10
  },
  textArbreItem: {
    justifyContent: 'center',
    marginLeft: 5
  },
  nomArbreItem: {
    fontSize: 20
  },
  container1: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10,
    marginTop: 15
  },
  loginButtonLabel: {
    fontSize: 22
  },
  navButtonText: {
    fontSize: 16
  }
})

export default Accueil

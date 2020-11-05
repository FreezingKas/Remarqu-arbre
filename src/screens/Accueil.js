import React from 'react';
import { StyleSheet, Text, View, TextInput, StatusBar } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Provider } from 'react-native-paper'

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

        <MyMap nav={this.props.navigation}/>
        <Provider>
          <MyMenu state={this.state.isMenuVisible}
            nav={this.props.navigation}
            funcToggleMenu={this.toggleMenu}
            funcToggleModal={this.toggleModal}
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
  flatlist: {
    marginHorizontal: 10
  },
})

export default Accueil

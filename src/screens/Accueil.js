import React from 'react';
import { StyleSheet, Text, View, TextInput, StatusBar, YellowBox, ActivityIndicator } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Provider } from 'react-native-paper'

import data from '../helpers/Arbre';
import { getArbreFromDataWithSearchedText } from '../helpers/Arbre';

import MyMap from '../Components/MyMap';

import ListItem from '../Components/ListItem';
import MyModal from '../Components/MyModal'
import MyMenu from '../Components/MyMenu';


/**
 * Firebase
 */

// firebase SDK module
import * as firebase from 'firebase';
import 'firebase/firestore';
import firebaseConfig from '../helpers/firebase'


// on check si l'instance de firebase a déja été crée si non on la crée
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// on instancie firestore dans une variable c'est obligatoire (jsp pas pourquoi)
const db = firebase.firestore();

// faut pas faire ca normalement
YellowBox.ignoreWarnings(['Setting a timer']);


// array contenant toutes les données de chaque arbre
let dataArbre = [];
/**
 * Fin Firebase
 */


class Accueil extends React.Component {

  constructor(props) {
    super(props)
    modalizeRef = React.createRef()
    this.searchedText = ""
    this.getData()
    

    this.state = {
      data: data,
      dataHistorique: undefined,
      isModalVisible: false,
      isMenuVisible: false,
      state: false,
      isLoaded: false
    }
  }

  getDataUser = async () => {
    console.log("Aucun utilisateur connecté")
    if(firebase.auth().currentUser != null) {
      let dataOneUser = [];
      let dataAllUser = [];
      const snapshot = db.collection('UserData');
               
      const dataIdUser = await snapshot.get();
      dataIdUser.forEach(doc => {
        dataAllUser.push(doc.id);
      })

      console.log(dataAllUser)
      console.log("Ok.")

      if(dataAllUser.includes(firebase.auth().currentUser.uid)) {
        console.log("Utilisateur déjà dans UserData")

        const user = await snapshot.doc(firebase.auth().currentUser.uid).get()
        for (var i=1; i<=532; i++) {
          if (user.get("AR" + i) != null) {
            dataOneUser.push(await user.get("AR" + i))
          }
        }
        this.setState({dataHistorique: dataOneUser})
        console.log(this.state.dataHistorique)
        
          
      } else {
        console.log("Nouvel utilisateur ajouté a UserData -> " + firebase.auth().currentUser.uid)
        const addNewUserinUserData = await snapshot.doc(firebase.auth().currentUser.uid).set({initialisation: true});
        this.setState({dataHistorique: []})
      }
      this.forceUpdate()
    }
  }

  async getData() {
    // récupération des identifiants d'accès aux données de la collection ARBRE dans firestore
    const snapshot = db.collection("ARBRE");
    // récupération des données
    const arbre = await snapshot.get();
    // classique boucle pour ajouter chaque arbre à l'array 
    arbre.forEach(doc => {
        dataArbre.push(doc.data());
      });
    this.setState({isLoaded: true})
    this.getDataUser();
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
    // screen quand les données des arbres ne sont pas encore récupérés
    if (!this.state.isLoaded) {
      return (
          <View style={styles.container}>
              <ActivityIndicator size="large" color="#00ff00" style={styles.activityInd} />
          </View>
      )
    }
    else if(this.state.isLoaded) {
        return (
          <View style={styles.container}>
            <StatusBar hidden={true} />
    
            <MyMap nav={this.props.navigation} dataArbre={dataArbre}/>
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
                data: this.state.dataHistorique,
                keyExtractor: (item) => item.id.toString(),
                renderItem: ({ item }) => (
                  <ListItem
                    item={item}
                    nav={this.props.navigation}
                    dataArbre={dataArbre}
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  activityInd: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
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

import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Image, StatusBar, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Modalize} from 'react-native-modalize';
import { Title, IconButton } from 'react-native-paper';
import Modal from 'react-native-modal';

import data from '../helpers/Arbre';

import MyMap from '../Components/MyMap';
import FormInput from '../Components/FormInput';
import FormButton from '../Components/FormButton';
import ListItem from '../Components/ListItem';

class Accueil extends React.Component {

  constructor(props) {
    super(props)
    modalizeRef = React.createRef()

    this.state = {
      isModalVisible : false,
      isMenuVisible: false,
      menu: {
        opacity: 0
      }
    }
  }

  onOpen = () => {
    modalizeRef.current?.open();
  };

  toggleModal = () =>{
    this.setState({
    isModalVisible:!this.state.isModalVisible
    })
  };

  _toggleMenu() {
    if(!this.state.isMenuVisible) {
      this.setState((state) => ({
        isMenuVisible: true,
        menu: {
          opacity: 100,
          backgroundColor: '#ddd',
          width: 70,
          borderRadius: 20,
          borderColor: 'black',
          borderWidth: 2,
          marginLeft: 1
        }
      }));
    }
    else {
      this.setState((state) => ({
        isMenuVisible: false,
        menu: {
          opacity: 0
        }
      }));
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />

        <MyMap></MyMap>

        <TouchableOpacity onPress={() => this._toggleMenu()} style={styles.button}>
          <Image style={styles.imageButton} source={require('../Ressources/Images/burger.png')}/>
        </TouchableOpacity>

        <View style={this.state.menu}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("Scan")}>
            <Image style={{backgroundColor: '#FFF', margin:7, height: 48, width: 48, borderRadius: 24}} source={require('../Ressources/Images/scan.png')}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onOpen()}>
            <Image style={{backgroundColor: '#FFF', margin:7, height: 48, width: 48, borderRadius: 24}} source={require('../Ressources/Images/history.png')}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.toggleModal()}>
            <Image style={{backgroundColor: '#FFF', margin:7, height: 48, width: 48, borderRadius: 24}} source={require('../Ressources/Images/login.png')}/>
          </TouchableOpacity>
        </View>

        <Modalize
          ref={modalizeRef}
          flatListProps={{
            style: styles.flatlist,
            data: data,
            keyExtractor: (item) => item.id.toString(),
            renderItem: ({item}) => (
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
              <TextInput style={styles.search} placeholder='Cherchez un arbre !'/>
            </View>
          }
        />

        <Modal isVisible={this.state.isModalVisible} useNativeDriver={true} style={{backgroundColor: "white", marginTop: '40%', borderRadius: 10, maxHeight: Dimensions.get('window').height/2}} onBackdropPress={() => this.toggleModal(false)}>
          <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
            <View style={styles.container1}>
              <Title style={styles.titleText}>Bienvenue !</Title>
              <FormInput
                labelName='Email'
                autoCapitalize='none'

                theme={{ colors: { primary: 'green',underlineColor:'green',}}}
                underlineColor={('green')}
              />
              <FormInput
                labelName='Mot de passe'
                secureTextEntry={true}
                theme={{ colors: { primary: 'green',underlineColor:'green',}}}
                underlineColor={('green')}
              />
              <FormButton
                title='Connexion'
                modeValue='contained'
                labelStyle={styles.loginButtonLabel}
                onPress={() => console.log("Connexion")}
                color={'green'}
              />
              <FormButton
                title='Nouveau ici ?'
                modeValue='text'
                uppercase={false}
                labelStyle={styles.navButtonText}
                onPress={() => console.log("Inscription")}
                color={'green'}

              />
              <IconButton icon="arrow-down-thick" color={'green'} size={32} onPress={()=> this.toggleModal()}/>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    top: 0,
    left: 0,
    marginTop: 15,
    marginLeft: 15,

    
    padding: 5,

    height:54,
    width:54,

    borderRadius:27,

    backgroundColor:'#FFF',

    justifyContent:'center',
    alignItems:'center',

    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 12,
    },
    shadowOpacity: 0.98,
    shadowRadius: 18.00,

    elevation: 38,
  },
  imageButton:{
    width: 32,
    height:32
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
    marginTop: 5,
    marginBottom: 5,
  },
  flatlist: {
    marginLeft: 10,
    marginRight: 10
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

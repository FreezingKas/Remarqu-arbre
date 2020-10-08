import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, TextInput, Image, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Modalize} from 'react-native-modalize';
import { Title } from 'react-native-paper';
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
  }

  onOpen = () => {
    modalizeRef.current?.open();
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        
        <MyMap></MyMap>
        <TouchableOpacity onPress={() => this.onOpen()}>
          <Image style={{backgroundColor: '#FFF', margin:10, height: 48, width: 48, borderRadius: 24}} source={require('../Ressources/Images/burger.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Scan")}>
          <Text style={{backgroundColor: 'white', margin:10, height: 48, width: 48, borderRadius: 16}}>S</Text>
        </TouchableOpacity>
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
              <TextInput style={styles.search} placeholder='Ceci est un TextInput'/>
            </View>
          }
        />

        <Modal isVisible={false} style={{backgroundColor: "white", borderRadius: 10}}>
          <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
            <View style={styles.container1}>
              <Title style={styles.titleText}>Bienvenue dans ScanArbre</Title>
              <FormInput
                labelName='Email'
                autoCapitalize='none'
              />
              <FormInput
                labelName='Mot de passe'
                secureTextEntry={true}
              />
              <FormButton
                title='Connexion'
                modeValue='contained'
                labelStyle={styles.loginButtonLabel}
                onPress={() => console.log("Connexion")}
              />
              <FormButton
                title='Nouveau membre ? Inscris-toi'
                modeValue='text'
                uppercase={false}
                labelStyle={styles.navButtonText}
                onPress={() => console.log("Inscription")}
              />
            </View>
          </View>
        </Modal>
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
    marginBottom: 10
  },
  loginButtonLabel: {
    fontSize: 22
  },
  navButtonText: {
    fontSize: 16
  }
})

export default Accueil

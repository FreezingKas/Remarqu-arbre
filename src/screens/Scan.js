import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, Image, TouchableOpacity } from 'react-native';

import FormButton from '../Components/FormButton';

class Scan extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      uri: require('../Ressources/Images/readyScan.png'),
      title_text: "Prêt à scanner",
      description_text: "Approchez votre téléphone de la puce sur l'arbre.",
      try_button: "SCANNER",
      error: false,
      colorButton: 'green',

      color: {
        backgroundColor: 'white'
      }
    }
  }

  _changeToViewScan() {
    if(!this.state.error) {
      this.setState((state) => ({
        uri: require('../Ressources/Images/errorScan.png'),
        title_text: "Puce NFC introuvable !",
        description_text: "Réessayer d'approchez votre téléphone de la puce sur l'arbre.",
        try_button: "RÉESAYER",
        error: true,
        colorButton: 'red',

        color: {
          backgroundColor: '#FFC2C2'
        }
      }));
    }
    else {
      this.setState((state) => ({
        uri: require('../Ressources/Images/readyScan.png'),
        title_text: "Prêt à scanner",
        description_text: "Approchez votre téléphone de la puce sur l'arbre.",
        try_button: "SCANNER",
        error: false,
        colorButton: 'green',

        color: {
          backgroundColor: 'white'
        }
      }));
    }
}


  render() {
    return (
      <SafeAreaView style={[styles.container, this.state.color]}>
        <Text style={styles.title_text}>{this.state.title_text}</Text>
        <Image
          source={this.state.uri}
          style={styles.scan_image}
        />
        <Text style={styles.description_text}>{this.state.description_text}</Text>
        <FormButton
          title={this.state.try_button}
          modeValue='contained'
          labelStyle={styles.loginButtonLabel}
          onPress={() => this._changeToViewScan()}
          color={this.state.colorButton}
        />
        <FormButton
          title='Annuler'
          modeValue='contained'
          labelStyle={styles.loginButtonLabel}
          onPress={() => this.props.navigation.navigate("Accueil")}
          color={this.state.colorButton}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  title_text: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  scan_image: {
    width: Dimensions.get('window').width/1.10,
    height: Dimensions.get('window').width/1.10,
    marginBottom: 20
  },
  description_text: {
    textAlign: 'center',
    fontSize: 20,
    color: '#444',
    marginBottom: 20
  },
  loginButtonLabel: {
    fontSize: 22
  }
});

export default Scan

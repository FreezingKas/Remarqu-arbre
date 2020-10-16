import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';

import FormButton from '../Components/FormButton';

class Scan extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      uri: require('../Ressources/Images/readyScan.png'),
      titleText: "Prêt à scanner",
      DescriptionText: "Approchez votre téléphone de la puce sur l'arbre.",
      tryButton: "SCANNER",
      errorScan: false,
      colorButton: 'green',

      color: {
        backgroundColor: 'white'
      }
    }
  }

  _changeToViewScan() {
    if(!this.state.errorScan) {
      this.setState((state) => ({
        uri: require('../Ressources/Images/errorScan.png'),
        titleText: "Puce NFC introuvable !",
        DescriptionText: "Réessayer d'approchez votre téléphone de la puce sur l'arbre.",
        tryButton: "RÉESAYER",
        errorScan: true,
        colorButton: 'red',

        color: {
          backgroundColor: '#FFC2C2'
        }
      }));
    }
    else {
      this.setState((state) => ({
        uri: require('../Ressources/Images/readyScan.png'),
        titleText: "Prêt à scanner",
        DescriptionText: "Approchez votre téléphone de la puce sur l'arbre.",
        tryButton: "SCANNER",
        errorScan: false,
        colorButton: 'green',

        color: {
          backgroundColor: 'white'
        }
      }));
    }
  }

  render() {
    return (
      <View style={[styles.containerView, this.state.color]}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>{this.state.titleText}</Text>
        </View>
        <View style={styles.imageView}>
          <Image
            source={this.state.uri}
            style={styles.scanImage}
          />
        </View>
        <View style={styles.textView}>
          <Text style={styles.DescriptionText}>{this.state.DescriptionText}</Text>
        </View>
        <View style={styles.buttonView}>
          <FormButton
            title={this.state.tryButton}
            modeValue='contained'
            labelStyle={styles.loginButtonLabel}
            onPress={() => this._changeToViewScan()}
            color={this.state.colorButton}
          />
          <FormButton
            title='Annuler'
            modeValue='text'
            labelStyle={styles.loginButtonLabel}
            onPress={() => this.props.navigation.navigate("Accueil")}
            color={this.state.colorButton}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1
  },
  titleView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20
  },
  imageView: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20
  },
  textView: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonView: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20
  },
  titleText: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
  },
  scanImage: {
    width: Dimensions.get('window').width/1.10,
    height: Dimensions.get('window').width/1.10,
  },
  DescriptionText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#444',
  },
  loginButtonLabel: {
    fontSize: 22
  }
});

export default Scan

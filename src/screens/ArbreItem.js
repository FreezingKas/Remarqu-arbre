import React from 'react';
import { StyleSheet, Text, View, Linking, TouchableOpacity, Image, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import {getArbreDetailFromData} from '../helpers/Arbre'

class ArbreItem extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      arbre: undefined,
      isLoading: false
    }
  }

  _updateNavigationParams() {
    this.props.navigation.setParams({
      arbre: this.state.arbre
    })
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    this.setState({
      arbre: getArbreDetailFromData(this.props.navigation.state.params.id),
      isLoading: false
    }, () => { this._updateNavigationParams() })
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  _displayArbre() {
    if(this.state.arbre != undefined) {
      console.log("Affichage de l'arbre avec l'id : " + this.state.arbre.id)
      return(
        <ScrollView style={{marginLeft: 5, marginRight: 5}}>
          <View style={{flex:1, flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
            <TouchableOpacity onPress = {() => this.props.navigation.navigate("Accueil")}>
              <Image
                source = {require('../Ressources/Images/goBack.png')}
                style = {styles.goBack_image}
              />
            </TouchableOpacity>
            <Text style={styles.title_text}>{this.state.arbre.nom} de {this.state.arbre.ville}</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Image
              source= {require('../Ressources/Images/arbre.jpg')}
              style={styles.arbre_image}
            />
          </View>
          <Text style={styles.section_text}>INFORMATIONS</Text>
          <Text style={styles.default_text}>Lieu : {this.state.arbre.ville}</Text>
          <Text style={styles.default_text}>Essence : {this.state.arbre.essence}</Text>
          <Text style={styles.default_text}>Taille : {this.state.arbre.taille}</Text>
          <Text style={styles.default_text}>Âge : {this.state.arbre.age} ans</Text>
          <Text style={styles.section_text}>HISTOIRE</Text>
          <Text style={styles.default_text}>{this.state.arbre.histoire}</Text>
          <Text style={styles.section_text}>LIEN EXTERNE</Text>
          <TouchableOpacity onPress={() => Linking.openURL(this.state.arbre.site)}>
            <Text style={styles.lien_text}>Site externe</Text>
          </TouchableOpacity>
          <Text style={styles.section_text}>VIDÉO</Text>
          <Text style={styles.default_text}>{this.state.arbre.video}</Text>
        </ScrollView>
      )
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayArbre()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  loading_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title_text: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 20
  },
  goBack_image: {
    width: 32,
    height: 32
  },
  arbre_image: {
    width: Dimensions.get('window').width/1.5,
    height: Dimensions.get('window').width/1.5,
    borderRadius: Dimensions.get('window').width/2,
    borderColor: '#000',
    borderWidth: 3,
    marginBottom: 15
  },
  section_text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10
  },
  default_text: {
    fontSize: 16,
    color: '#444',
    textAlign: 'justify'
  },
  lien_text: {
    fontSize: 16,
    color: '#606AA5',
    textDecorationLine: 'underline'
  }
});

export default ArbreItem

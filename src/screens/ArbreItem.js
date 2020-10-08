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
            <TouchableOpacity onPress = {() => this.props.navigation.navigate("Accueil")} style={styles.button}>
              <Image
                source = {require('../Ressources/Images/goBack.png')}
                style = {styles.goBack_image}
              />
            </TouchableOpacity>
            <Text style={styles.title_text}>{this.state.arbre.nom} de {this.state.arbre.ville}</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <View style={{elevation: 24, width: Dimensions.get('window').width/1.5,height: Dimensions.get('window').width/1.5,borderRadius: Dimensions.get('window').width/2 }}>
            <Image
              source= {require('../Ressources/Images/arbre.jpg')}
              style={styles.arbre_image}
            />
            </View>
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
      <View style={styles.container}>
        {this._displayLoading()}
        {this._displayArbre()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    top: 0,
    left: 0,
    marginTop: 15,
    marginLeft: 5,
    marginBottom: 15,

    
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
  container: {
    flex: 1,
    
  },
  loading_container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title_text: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 15,
    width: '86%'
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
    marginBottom: 15,
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
